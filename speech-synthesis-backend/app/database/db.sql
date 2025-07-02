-- Supprimer les tables existantes si elles existent (dans l'ordre inverse des dépendances)
DROP TABLE IF EXISTS synthesis;
DROP TABLE IF EXISTS militants;

CREATE TABLE militants (
    -- Clé primaire auto-incrémentée
    id SERIAL PRIMARY KEY,
    
    -- Informations du militant
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    
    -- Code d'authentification (peut être un hash si besoin de sécurité)
    code VARCHAR(255) NOT NULL,
    
    -- Statut actif/inactif
    actif BOOLEAN DEFAULT true,
    
    -- Métadonnées automatiques
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les recherches rapides
CREATE INDEX idx_militants_nom ON militants(nom);
CREATE INDEX idx_militants_email ON militants(email);
CREATE INDEX idx_militants_actif ON militants(actif);
CREATE UNIQUE INDEX idx_militants_nom_code ON militants(nom, code);

-- Créer la table Synthesis
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
    
    -- Clé étrangère vers la table militant
    militants_id INTEGER,
    
    -- Métadonnées automatiques
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Contrainte de clé étrangère
    CONSTRAINT fk_synthesis_militants 
        FOREIGN KEY (militants_id) 
        REFERENCES militants(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);

-- Index sur l'email pour les recherches rapides
CREATE INDEX idx_synthesis_citizen_email ON synthesis(citizen_email);

-- Index sur la date de création
CREATE INDEX idx_synthesis_created_at ON synthesis(created_at);

-- Index sur la clé étrangère militant_id pour optimiser les jointures
CREATE INDEX idx_synthesis_militants_id ON synthesis(militants_id);

-- Index sur le code du militant pour les recherches rapides
CREATE INDEX idx_militants_code ON militants(code);

-- Exemple d'insertion de données pour tester
-- INSERT INTO militant (nom, code) VALUES ('Jean Dupont', 1001);
-- INSERT INTO militant (nom, code) VALUES ('Marie Martin', 1002);

-- INSERT INTO synthesis (
--     original_text, 
--     analysis_result, 
--     citizen_firstname, 
--     citizen_lastname, 
--     citizen_email, 
--     militant_id
-- ) VALUES (
--     'Texte de discussion exemple', 
--     'Analyse de la discussion', 
--     'Pierre', 
--     'Durand', 
--     'pierre.durand@email.com', 
--     1
-- );