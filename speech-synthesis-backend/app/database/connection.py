import os
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
import logging
from pydantic import BaseModel, validator
from datetime import datetime
import json
from datetime import date
from fastapi import HTTPException
import traceback  # en haut du fichier
from typing import Optional


# Configuration de la base de données
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://speech_user:speech_password@localhost:5432/speech_synthesis_db"
)

# Créer l'engine SQLAlchemy
engine = create_engine(DATABASE_URL)

# Créer une session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base pour les modèles ORM (si on en a besoin plus tard)
Base = declarative_base()

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CrewResponse(BaseModel):
    success: bool
    original_text: str
    analysis_result: str = None
    dialogue_structure: str = None
    tasks_completed: int = None
    error: str = None
    id: int = None  # Champ optionnel pour le retour après insertion


def get_db():
    """
    Générateur de session de base de données
    À utiliser avec FastAPI Depends()
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def test_connection():
    """
    Teste la connexion à la base de données
    """
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            logger.info("✅ Connexion à la base de données réussie")
            return True
    except SQLAlchemyError as e:
        logger.error(f"❌ Erreur de connexion à la base de données: {e}")
        return False

def get_synthesis_count():
    """
    Fonction utilitaire pour compter les entrées dans synthesis
    """
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT COUNT(*) FROM synthesis"))
            count = result.scalar()
            logger.info(f"📊 Nombre d'entrées dans synthesis: {count}")
            return count
    except SQLAlchemyError as e:
        logger.error(f"❌ Erreur lors du comptage: {e}")
        raise e

def execute_query(query: str):
    """
    Exécute une requête SQL simple et retourne le résultat
    """
    try:
        with engine.connect() as connection:
            result = connection.execute(text(query))
            # Si c'est une requête SELECT, retourner les résultats
            if query.strip().upper().startswith('SELECT'):
                return result.fetchall()
            else:
                return f"Requête exécutée avec succès"
    except SQLAlchemyError as e:
        logger.error(f"❌ Erreur lors de l'exécution de la requête: {e}")
        raise e
    
def save_synthese(agents_result: CrewResponse):
    try:
        with engine.connect() as connection:
            result = connection.execute(
                text("INSERT INTO synthesis (original_text, analysis_result, dialogue_structure, tasks_completed, created_at) VALUES (:orig, :analysis, :dialogue, :task, :date) RETURNING id"),
                {
                    "orig": agents_result.original_text,
                    "analysis": json.dumps(agents_result.analysis_result),
                    "dialogue": json.dumps(agents_result.dialogue_structure),
                    "task": agents_result.tasks_completed,
                    "date": datetime.now()
                }
            )
            connection.commit()

            inserted_id = result.fetchone()[0]
            logger.info(inserted_id)

            # Retourne une copie de l'objet avec un champ `id` ajouté
            enriched_result = agents_result.copy(update={"id": inserted_id})
            logger.info(enriched_result)
            return enriched_result
    except Exception as e:
        logger.error(f"ERREUR: {e}")
        raise
    



class CitizenUpdateRequest(BaseModel):
    citizen_firstname: str
    citizen_lastname: str
    citizen_email: str
    citizen_dob: Optional[str]  # peut être None ou une string vide

    @validator("citizen_dob", pre=True)
    def validate_dob_format(cls, v):
        if v in (None, "", " "):
            return None  # Interprété comme NULL en DB
        try:
            datetime.strptime(v, "%Y-%m-%d")
            return v
        except ValueError:
            return None  # Format invalide = on ignore
        


def perform_update_citizen_info(synthesis_id: int, citizen_data: CitizenUpdateRequest):
    try:
        # Parser la date uniquement si elle existe
        dob_date = None
        if citizen_data.citizen_dob:
            try:
                dob_date = datetime.strptime(citizen_data.citizen_dob, "%Y-%m-%d").date()
            except ValueError:
                # On log l'erreur, mais on ignore pour la sauvegarde
                print("⚠️ Date invalide ignorée :", citizen_data.citizen_dob)
                dob_date = None

        # Connexion à la base + update
        with engine.begin() as connection:
            result = connection.execute(
                text("""
                    UPDATE synthesis 
                    SET citizen_firstname = :firstname,
                        citizen_lastname = :lastname,
                        citizen_email = :email,
                        citizen_dob = :dob,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = :synthesis_id
                """),
                {
                    "firstname": citizen_data.citizen_firstname,
                    "lastname": citizen_data.citizen_lastname,
                    "email": citizen_data.citizen_email,
                    "dob": dob_date,
                    "synthesis_id": synthesis_id
                }
            )

            if result.rowcount == 0:
                raise HTTPException(status_code=404, detail="Synthèse non trouvée")

        return {
            "success": True,
            "message": "Informations du citoyen mises à jour avec succès",
            "synthesis_id": synthesis_id
        }

    except HTTPException:
        raise
    except SQLAlchemyError:
        print("❌ Erreur SQL :", traceback.format_exc())
        raise HTTPException(status_code=500, detail="Erreur de base de données")
    except Exception:
        print("❌ Erreur inattendue :", traceback.format_exc())
        raise HTTPException(status_code=500, detail="Erreur interne lors de la mise à jour")



def perform_get_synthese(synthese_id: int):
    try:
        with engine.connect() as connection:
            result = connection.execute(
                text("""SELECT id, original_text, analysis_result, dialogue_structure, tasks_completed, 
                         citizen_firstname, citizen_lastname, citizen_email, citizen_dob, 
                         created_at, updated_at 
                         FROM synthesis WHERE id = :id"""),
                {"id": synthese_id}
            )
            
            row = result.fetchone()
            
            if row is None:
                raise HTTPException(status_code=404, detail="Synthèse non trouvée")
            
            # Reconstitution complète avec tous les champs
            synthese_data = {
                "id": row[0],
                "original_text": row[1],
                "analysis_result": json.loads(row[2]) if row[2] else None,
                "dialogue_structure": json.loads(row[3]) if row[3] else None,
                "tasks_completed": row[4],
                "citizen_firstname": row[5],
                "citizen_lastname": row[6],
                "citizen_email": row[7],
                "citizen_dob": row[8],
                "created_at": row[9],
                "updated_at": row[10]
            }
            
            return synthese_data
            
    except Exception as e:
        logger.error(f"Erreur lors de la récupération de la synthèse {synthese_id}: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")
    
def perform_get_all_syntheses(start_date,sort,offset,sort_column,order_direction):

    where_clauses = []
    params = {"offset": offset}
    if start_date:
        where_clauses.append("DATE(created_at) = :start_date")
        # Assure toi que start_date soit en datetime UTC min
        params["start_date"] = datetime.combine(start_date, datetime.min.time())
    where_sql = ""
    if where_clauses:
        where_sql = "WHERE " + " AND ".join(where_clauses)
  
    try:

        # Protection simple contre SQL Injection (whitelist de colonnes autorisées)
        allowed_columns = {
            "id", "created_at", "updated_at", "citizen_firstname", "citizen_lastname"
        }
        if sort_column not in allowed_columns:
            raise HTTPException(status_code=400, detail="Colonne de tri invalide")

        with engine.connect() as connection:
            query = text(f"""
                SELECT id, original_text, analysis_result, dialogue_structure, tasks_completed, 
                       citizen_firstname, citizen_lastname, citizen_email, citizen_dob, 
                       created_at, updated_at
                FROM synthesis
                {where_sql}
                ORDER BY {sort_column} {order_direction}
                OFFSET :offset
            """)
            result = connection.execute(query, params)
            rows = result.fetchall()

            data = []
            for row in rows:
                data.append({
                    "id": row.id,
                    "original_text": row.original_text,
                    "analysis_result": row.analysis_result,
                    "dialogue_structure": row.dialogue_structure,
                    "tasks_completed": row.tasks_completed,
                    "citizen_firstname": row.citizen_firstname,
                    "citizen_lastname": row.citizen_lastname,
                    "citizen_email": row.citizen_email,
                    "citizen_dob": row.citizen_dob,
                    "created_at": row.created_at,
                    "updated_at": row.updated_at
                })

            return {
                "message": "Synthèses récupérées avec succès",
                "count": len(data),
                "offset": offset,
                "sort": sort,
                "data": data
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))