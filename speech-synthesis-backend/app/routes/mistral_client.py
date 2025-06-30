import httpx
import os
from fastapi import HTTPException
from typing import Optional

MISTRAL_API_KEY = 'xMpsXmyfrawoSqMqryd1re5Ap3ejdBLO'
MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"
    
class MistralClient:
    """
    Client pour interagir avec l'API Mistral AI
    """
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialise le client Mistral
        
        Args:
            api_key: Clé API Mistral. Si None, utilise la variable d'environnement MISTRAL_API_KEY
        """
        self.api_key = MISTRAL_API_KEY
        if not self.api_key:
            raise ValueError("MISTRAL_API_KEY doit être définie")
            
        self.api_url = "https://api.mistral.ai/v1/chat/completions"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    async def generate_response(
        self, 
        prompt: str, 
        model: str = "mistral-small-latest",
        max_tokens: int = 1000,
        temperature: float = 0.7
    ) -> str:
        """
        Génère une réponse avec Mistral AI
        
        Args:
            prompt: Le prompt à envoyer à Mistral
            model: Le modèle à utiliser
            max_tokens: Nombre maximum de tokens
            temperature: Créativité de la réponse (0.0 à 1.0)
            
        Returns:
            str: La réponse générée par Mistral
            
        Raises:
            HTTPException: En cas d'erreur API
        """
        payload = {
            "model": model,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": max_tokens,
            "temperature": temperature
        }
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    self.api_url,
                    headers=self.headers,
                    json=payload,
                    timeout=30.0
                )
                response.raise_for_status()
                
                result = response.json()
                return result["choices"][0]["message"]["content"]
                
            except httpx.HTTPStatusError as e:
                raise HTTPException(
                    status_code=e.response.status_code,
                    detail=f"Erreur API Mistral: {e.response.text}"
                )
            except httpx.TimeoutException:
                raise HTTPException(
                    status_code=408,
                    detail="Timeout lors de l'appel à Mistral API"
                )
            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=f"Erreur lors de l'appel à Mistral: {str(e)}"
                )
    
    async def generate_sql_response(self, query: str, context: Optional[str] = None) -> str:
        """
        Méthode spécialisée pour les requêtes SQL
        
        Args:
            query: La requête utilisateur
            context: Contexte additionnel (schéma de base de données, etc.)
            
        Returns:
            str: Réponse SQL générée
        """
        prompt = f"""
        Tu es un assistant SQL expert. 
        
        Requête utilisateur: {query}
        {f"Contexte additionnel: {context}" if context else ""}
        
        Réponds de manière claire et précise. Si c'est une demande de génération SQL, 
        fournis le code SQL optimisé avec des explications.
        """
        
        return await self.generate_response(prompt, temperature=0.3)  # Plus déterministe pour SQL
    
    @staticmethod
    def get_available_models() -> list[str]:
        """
        Retourne la liste des modèles Mistral disponibles
        """
        return [
            "mistral-small-latest",
            "mistral-medium-latest", 
            "mistral-large-latest"
        ]
    
    def validate_model(self, model: str) -> bool:
        """
        Valide si un modèle est disponible
        
        Args:
            model: Nom du modèle à valider
            
        Returns:
            bool: True si le modèle est disponible
        """
        return model in self.get_available_models()


# Instance globale du client (optionnel)
def get_mistral_client() -> MistralClient:
    """
    Factory function pour obtenir une instance du client Mistral
    Utilise le pattern Singleton pour éviter de recréer le client
    """
    if not hasattr(get_mistral_client, '_instance'):
        try:
            get_mistral_client._instance = MistralClient()
        except ValueError as e:
            # Retourne None si la clé API n'est pas configurée
            get_mistral_client._instance = None
    
    return get_mistral_client._instance