from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, validator
from .mistral_client import MistralClient, get_mistral_client
from .crew_agents import get_text_analysis_crew
from app.database.connection import perform_get_synthese, save_synthese, get_synthesis_count, perform_update_citizen_info
import logging
from datetime import date, datetime
import traceback  # en haut du fichier
from typing import Optional


##xMpsXmyfrawoSqMqryd1re5Ap3ejdBLO

router = APIRouter()
MISTRAL_API_KEY = 'xMpsXmyfrawoSqMqryd1re5Ap3ejdBLO'
MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"
    
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
    


@router.post("/analyseDiscussion")
async def analyseDiscussion(request:Request):
    """
    Endpoint pour poster une discussion sous forme de texte
    """
    test_text = """
    Bonjour ! Je fais partie d’un collectif citoyen qui s'intéresse à améliorer la vie dans notre ville. On fait du porte-à-porte pour discuter avec les habitants, connaître leurs besoins et leurs idées. Vous avez cinq minutes ?Oui, bien sûr, je vous écoute.Super, merci ! Pour commencer, est-ce que vous habitez ici depuis longtemps ?Oui, ça fait une douzaine d’années maintenant. J’ai vu pas mal de choses changer.Ah oui ? Et comment vous décririez la ville aujourd’hui, dans son état actuel ?Honnêtement ? Y’a du bon et du moins bon. C’est une ville agréable dans l’ensemble, mais je trouve qu’on manque d’espaces verts. Et puis la circulation est devenue un vrai problème, surtout aux heures de pointe.Vous n’êtes pas le premier à parler de ça. Et au niveau des transports en commun, vous en êtes satisfait ?Pas vraiment. Les bus ne sont pas assez fréquents, surtout le soir ou le week-end. Il faut souvent attendre longtemps, ou marcher loin jusqu'à un arrêt. Et pour les jeunes ou les personnes âgées, c’est pas évident.D’accord. Et si vous deviez changer une seule chose dans la ville, en priorité, ce serait quoi ?Je dirais... rendre la ville plus propre et plus sûre. Il y a des endroits qui sont vraiment laissés à l’abandon. Et le soir, on n’est pas toujours tranquille, surtout dans certaines rues.Je comprends. Et à l’inverse, est-ce qu’il y a quelque chose que vous aimez particulièrement ici ? Quelque chose qu’il faudrait absolument préserver ou développer ?Oui, j’aime bien le marché du samedi matin, il y a une vraie ambiance, c’est vivant. Et les petites associations locales qui organisent des événements. Ça crée du lien. Ce serait bien qu’on soutienne davantage ce genre d’initiatives.Très intéressant. Vous parliez d’associations. Vous participez à certaines activités locales, ou pas vraiment ?J’y pense parfois, mais j’avoue que je manque de temps. Et on ne sait pas toujours ce qui se fait. Il faudrait peut-être mieux communiquer.Justement, on pense qu’il y a un vrai besoin de recréer du lien entre les habitants, de faciliter la participation. Si vous aviez plus d’informations ou si c’était plus accessible, ça vous encouragerait à vous impliquer davantage ?Oui, je pense. Surtout si on pouvait avoir un genre de plateforme ou de bulletin qui récapitule les projets, les réunions, les événements... Ça aiderait à se sentir concerné.C’est une super idée, je vais la noter. Merci beaucoup pour votre temps, vos réponses sont vraiment précieuses. On essaie de recueillir un maximum d’avis pour construire des propositions qui répondent aux besoins réels.Avec plaisir. C’est bien ce que vous faites. Trop souvent on ne demande rien aux habitants, on décide à leur place. Bon courage à vous !Merci beaucoup ! Si vous êtes d’accord, je peux noter votre prénom et vous tenir au courant des suites de notre projet ?Bien sûr, je m’appelle Marc. Et si vous avez un site ou un contact, je suis preneur.Parfait, je vous laisse une carte avec nos infos. Merci encore, bonne journée Marc !Bonne journée à vous aussi !
    """

    content = await request.body()
    text = content.decode("utf-8")
    
    try:
        crew = get_text_analysis_crew()
        agents_result = crew.process_text(text)
    
        result = save_synthese(CrewResponse(**agents_result))
        
        return result
        
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
    

@router.get("/synthese/{synthese_id}")
async def get_synthese(synthese_id: int):
    try:
       return perform_get_synthese(synthese_id=synthese_id)
    except HTTPException as e:
        raise e