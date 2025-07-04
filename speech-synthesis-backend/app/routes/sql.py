from fastapi import APIRouter, HTTPException, Request, Depends, Header
from pydantic import BaseModel, validator
from .mistral_client import MistralClient, get_mistral_client
from .crew_agents import get_text_analysis_crew
from app.database.connection import perform_get_synthese, save_synthese, get_synthesis_count, perform_update_citizen_info, verify_militant_credentials, get_militant_by_id, create_militant, update_militant_status, get_all_militants
import logging
from datetime import date, datetime, timedelta
import traceback  # en haut du fichier
from typing import Optional
import jwt
import os

##xMpsXmyfrawoSqMqryd1re5Ap3ejdBLO

router = APIRouter()
MISTRAL_API_KEY = 'xMpsXmyfrawoSqMqryd1re5Ap3ejdBLO'
MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"

# Configuration pour l'authentification militant
JWT_SECRET = os.getenv("JWT_SECRET", "votre-secret-jwt-tres-securise")
JWT_ALGORITHM = "HS256"
TOKEN_EXPIRE_HOURS = 24
    
class CrewResponse(BaseModel):
    success: bool
    original_text: str
    analysis_result: str = None
    dialogue_structure: str = None
    tasks_completed: int = None
    error: str = None
    id: int = None  # Champ optionnel pour le retour après insertion


class MistralResponse(BaseModel):
    response: str
    model_used: str

class QueryResponse(BaseModel):
    success: bool
    query: str
    result: list = None
    count: int = None
    error: str = None

# Modèles pour la gestion des militants
class MilitantCreateRequest(BaseModel):
    nom: str
    prenom: str
    email: str
    code: str

class MilitantUpdateStatusRequest(BaseModel):
    actif: bool
# Modèles pour l'authentification militant
class MilitantAuthRequest(BaseModel):
    code: str

class MilitantAuthResponse(BaseModel):
    success: bool
    token: str = None
    message: str = None
    militant_name: str = None

@router.get("/health")
async def health():
    return {"status": "ok"}

# Dépendance pour extraire le token du header Authorization
def get_militant_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Token d'autorisation manquant")
    
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Format du token invalide")
    
    return authorization[7:]  # Enlever "Bearer "

# Middleware de protection pour les routes militant
def require_militant_auth(token: str = Depends(get_militant_token)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if not payload.get("militant"):
            raise HTTPException(status_code=403, detail="Accès militant requis")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Token invalide")


@router.post("/auth/militant", response_model=MilitantAuthResponse)
async def authenticate_militant(auth_request: MilitantAuthRequest):
    """
    Authentifie un militant avec son nom et son code en vérifiant en base de données
    """
    try:
        # Vérification des identifiants en base de données

        militant_info = verify_militant_credentials(auth_request.code)

        if not militant_info:
            raise HTTPException(
                status_code=401,
                detail="Nom ou code militant invalide"
            )
        
        # Créer le token JWT
        payload = {
            "militant": True,
            "militant_id": militant_info["id"],
            "nom": militant_info["nom"],
            "exp": datetime.utcnow() + timedelta(hours=TOKEN_EXPIRE_HOURS),
            "iat": datetime.utcnow()
        }
        
        token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
        
        return MilitantAuthResponse(
            success=True,
            token=token,
            message="Authentification réussie",
            militant_name=militant_info["nom"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de l'authentification: {str(e)}"
        )

@router.get("/auth/verify-militant")
async def verify_militant_token(token: str):
    """
    Vérifie la validité d'un token militant
    """
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("militant"):
            return {
                "valid": True, 
                "militant": True,
                "militant_id": payload.get("militant_id"),
                "nom": payload.get("nom")
            }
        else:
            return {"valid": False, "militant": False}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Token invalide")


@router.get("/api")
async def method():
    return {"message":"hello world"}


@router.get("/api/chat")
async def chat_with_mistral():
    """
    Endpoint générique pour discuter avec Mistral
    """
    # Méthode 2: Créer une nouvelle instance
    try:
        mistral_client = MistralClient()
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    try:
        response = await mistral_client.generate_response('Bonjour mistral, ça va ?')
        return MistralResponse(
            response=response,
            model_used="mistral-small-latest"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

import asyncio

@router.post("/analyseDiscussion")
async def analyseDiscussion(request: Request, payload: dict = Depends(require_militant_auth)):
    """
    Endpoint pour poster une discussion sous forme de texte
    Nécessite une authentification militant
    """


    content = await request.body()
    text = content.decode("utf-8")
    
    # Récupération des informations du militant depuis le token
    militant_name = payload.get("nom", "Militant anonyme")
    militant_id = payload.get("militant_id")
    
    try:
        crew = get_text_analysis_crew()

        agents_result = await asyncio.to_thread(crew.process_text,text)
        
        # Ajout d'informations sur le militant qui a soumis l'analyse
        agents_result["militant_name"] = militant_name
        agents_result["militant_id"] = militant_id
        agents_result["submitted_by"] = militant_name
    
        result = save_synthese(CrewResponse(**agents_result),militant_id)
        
        return {
            **result.dict(),
            "militant_name": militant_name,
            "message": f"Analyse soumise avec succès par {militant_name}"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Erreur lors du test CrewAI: {str(e)}"
        )


@router.get("/api/db/synthesis/count")
async def get_synthesis_entries_count():
    """
    Compte le nombre d'entrées dans la table synthesis
    """
    try:
        count = get_synthesis_count()
        return QueryResponse(
            success=True,
            query="SELECT COUNT(*) FROM synthesis",
            count=count,
            result=[{"count": count}]
        )
    except Exception as e:
        logger.error(f"Erreur lors du comptage: {e}")
        raise HTTPException(status_code=500, detail=str(e))



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
        
@router.put("/synthesis/{synthesis_id}/citizen")
async def update_citizen_info(synthesis_id: int, citizen_data: CitizenUpdateRequest):
    """
    Met à jour les informations du citoyen pour une synthèse donnée
    """ 
    try:
        return perform_update_citizen_info(synthesis_id, citizen_data)
    except HTTPException as e:
        raise e
    

@router.get("/synthese/{synthese_id}")
async def get_synthese(synthese_id: int):
    try:
       return perform_get_synthese(synthese_id=synthese_id)
    except HTTPException as e:
        raise e


# # Routes administratives pour la gestion des militants
# @router.post("/admin/militants")
# async def create_new_militant(militant_data: MilitantCreateRequest):
#     """
#     Crée un nouveau militant (route admin - peut être protégée plus tard)
#     """
#     try:
#         return create_militant(
#             nom=militant_data.nom,
#             prenom=militant_data.prenom,
#             email=militant_data.email,
#             code=militant_data.code
#         )
#     except HTTPException as e:
#         raise e


# @router.get("/admin/militants")
# async def list_militants(actif_only: bool = True):
#     """
#     Liste tous les militants (route admin)
#     """
#     try:
#         return get_all_militants(actif_only=actif_only)
#     except HTTPException as e:
#         raise e


# @router.put("/admin/militants/{militant_id}/status")
# async def update_militant_activity_status(militant_id: int, status_data: MilitantUpdateStatusRequest):
#     """
#     Met à jour le statut actif/inactif d'un militant (route admin)
#     """
#     try:
#         return update_militant_status(militant_id, status_data.actif)
#     except HTTPException as e:
#         raise e
    


# @router.get("/admin/militants/{militant_id}")
# async def get_militant_details(militant_id: int):
#     """
#     Récupère les détails d'un militant par son ID (route admin)
#     """
#     try:
#         militant = get_militant_by_id(militant_id)
#         if not militant:
#             raise HTTPException(status_code=404, detail="Militant non trouvé")
#         return militant
#     except HTTPException as e:
#         raise e
    

@router.get("/synthese/{synthese_id}")
async def get_synthese(synthese_id: int):
    try:
       return perform_get_synthese(synthese_id=synthese_id)
    except HTTPException as e:
        raise e