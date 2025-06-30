from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import sql

from sqlalchemy import text
from sqlalchemy.orm import Session
from pathlib import Path

# Configuration CORS pour Docker
origins = [
    "*",
    "http://localhost:3000",  # Frontend Docker
    "http://localhost:4200",  # Développement local Ember
    "https://speech-synthesis-frontend.vercel.app",  # Vercel si nécessaire
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sql.router)