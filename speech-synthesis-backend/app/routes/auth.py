# Dans votre backend FastAPI (app/routers/auth.py ou app/main.py)

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import os
from datetime import datetime, timedelta
import jwt

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

# Middleware de protection pour les routes admin
def require_admin_auth(token: str):
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
async def admin_dashboard(token: str = Depends(require_admin_auth)):
    return {"message": "Bienvenue dans l'administration", "data": "données sensibles"}