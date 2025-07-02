# Dans votre backend FastAPI (app/routers/auth.py ou app/main.py)

from fastapi import APIRouter, HTTPException, Depends, Query
from pydantic import BaseModel
import os
from datetime import datetime, timedelta
import jwt
from app.database.connection import perform_get_all_syntheses
from datetime import datetime, date
from typing import Optional


router = APIRouter()

# Modèle pour la requête d'authentification
class AdminAuthRequest(BaseModel):
    code: str

class AdminAuthResponse(BaseModel):
    success: bool
    token: str = None
    message: str = None

# Configuration
ADMIN_CODE = os.getenv("ADMIN_CODE", "ADMIN123")  # À définir dans vos variables d'environnement
JWT_SECRET = os.getenv("JWT_SECRET", "votre-secret-jwt-tres-securise")
JWT_ALGORITHM = "HS256"
TOKEN_EXPIRE_HOURS = 24

@router.post("/auth/admin", response_model=AdminAuthResponse)
async def authenticate_admin(auth_request: AdminAuthRequest):
    """
    Authentifie un utilisateur admin avec un code
    """
    if auth_request.code != ADMIN_CODE:
        raise HTTPException(
            status_code=401,
            detail="Code d'administration invalide"
        )
    
    # Créer le token JWT
    payload = {
        "admin": True,
        "exp": datetime.utcnow() + timedelta(hours=TOKEN_EXPIRE_HOURS),
        "iat": datetime.utcnow()
    }
    
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    
    return AdminAuthResponse(
        success=True,
        token=token,
        message="Authentification réussie"
    )

@router.get("/auth/verify-admin")
async def verify_admin_token(token: str):
    """
    Vérifie la validité d'un token admin
    """
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("admin"):
            return {"valid": True, "admin": True}
        else:
            return {"valid": False, "admin": False}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Token invalide")

# Dépendance pour extraire le token du header Authorization
from fastapi import Header

def get_admin_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Token d'autorisation manquant")
    
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Format du token invalide")
    
    return authorization[7:]  # Enlever "Bearer "

# Middleware de protection pour les routes admin
def require_admin_auth(token: str = Depends(get_admin_token)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if not payload.get("admin"):
            raise HTTPException(status_code=403, detail="Accès administrateur requis")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Token invalide")

# Exemple de route protégée
@router.get("/admin/dashboard")
async def admin_dashboard(payload: dict = Depends(require_admin_auth)):
    return {"message": "Bienvenue dans l'administration", "data": "données sensibles", "admin_info": payload}


@router.get("/admin/synthesis", summary="Récupérer la table synthesis avec pagination", tags=["Admin"])
def get_all_syntheses(
    payload: dict = Depends(require_admin_auth),
    offset: int = Query(0, ge=0, description="Offset pour la pagination"),
    sort: str = Query("id", description="Colonne de tri, ex: id ou -id pour desc"),
    start_date: Optional[date] = Query(None, description="Date de début au format YYYY-MM-DD"),

):
    try:
        print("ici")
        sort_column = sort.lstrip("-")
        order_direction = "DESC" if sort.startswith("-") else "ASC"
        result = perform_get_all_syntheses(start_date,sort,offset,sort_column,order_direction)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
