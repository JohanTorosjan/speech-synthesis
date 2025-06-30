DROP TABLE IF EXISTS synthesis;

CREATE TABLE synthesis (
    -- Clé primaire auto-incrémentée
    id SERIAL PRIMARY KEY,
    
    -- Texte original de la discussion
    original_text TEXT NOT NULL,
    
    -- Résultat de l'analyse par l'IA
    analysis_result TEXT,
    
    -- Structure du dialogue extraite
    dialogue_structure TEXT,
    
    -- Nombre de tâches complétées (stocké comme texte selon votre modèle)
    tasks_completed VARCHAR(50),
    
    -- Informations du citoyen
    citizen_firstname VARCHAR(100),
    citizen_lastname VARCHAR(100),
    citizen_email VARCHAR(255),
    citizen_dob DATE,
    
    -- Métadonnées automatiques
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Créer un index sur l'email pour les recherches rapides
CREATE INDEX idx_synthesis_citizen_email ON synthesis(citizen_email);

-- Créer un index sur la date de création
CREATE INDEX idx_synthesis_created_at ON synthesis(created_at);


