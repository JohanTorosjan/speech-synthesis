FROM python:3.11-slim

# Crée le dossier de travail
WORKDIR /app

# Copie les fichiers
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

