from crewai import Agent, Task, Crew, Process, LLM
from typing import Any
import os

# Configuration de la clé API Mistral comme variable d'environnement
os.environ["MISTRAL_API_KEY"] = "xMpsXmyfrawoSqMqryd1re5Ap3ejdBLO"

class TextAnalysisCrew:
    """
    Crew pour analyser et traiter du texte avec plusieurs agents
    """
    
    def __init__(self):
        # Configuration du LLM (Mistral) - méthode corrigée
        self.llm = LLM(
            model="mistral/mistral-small-latest",
            api_key="xMpsXmyfrawoSqMqryd1re5Ap3ejdBLO",
            temperature=0.7
        )
    
    def create_agents(self):
        """
        Crée les différents agents spécialisés
        """
        
        # Agent 1: Analyseur de texte
        # text_analyzer = Agent(
        #     role="Analyseur de Texte",
        #     goal="Analyser la structure, le ton et le contenu d'un texte",
        #     backstory="""Tu es un expert en analyse textuelle. Tu identifies les éléments clés 
        #     d'un texte : sentiment, structure, mots-clés, et points importants.""",
        #     verbose=True,
        #     allow_delegation=False,
        #     llm=self.llm  # Utilisation de l'instance LLM
        # )
        
        # Agent 2: Extracteur d'informations

        info_extractor = Agent(
            role="Structurateur de dialogues",
            goal="Identifier les changements de locuteur dans un texte brut et structurer les échanges entre un Militant et un Citoyen",
            backstory="""Tu es spécialisé dans la transformation de textes transcrits en dialogues clairs. Tu sais reconnaître un Militant et un Citoyen à leur façon de parler, sans te fier à la ponctuation. Tu travailles sur des conversations politiques en porte-à-porte.""",
            verbose=True,
            allow_delegation=False,
            llm=self.llm
)
        # Agent 3: Résumeur et reformulateur
        summarizer = Agent(
            role="Résumeur Expert",
            goal="Créer des résumés clairs et des reformulations du contenu",
            backstory="""Tu es un expert en synthèse. Tu crées des résumés concis 
            et des reformulations claires, en gardant l'essentiel du message.""",
            verbose=True,
            allow_delegation=False,
            llm=self.llm  # Utilisation de l'instance LLM
        )
        
        return info_extractor, summarizer
    
    def create_tasks(self, text_input: str, agents: tuple):
        """
        Crée les tâches pour chaque agent
        """
        info_extractor, summarizer = agents
        
        # Tâche 1: Analyse du texte
        # analysis_task = Task(
        #     description=f"""
        #     Analyse le texte suivant et fournis :
        #     1. Le sentiment général (positif/négatif/neutre)
        #     2. Le type de texte (email, article, conversation, etc.)
        #     3. Les thèmes principaux abordés
        #     4. Le niveau de formalité
            
        #     Texte à analyser : {text_input}
        #     """,
        #     agent=text_analyzer,
        #     expected_output="Analyse structurée du texte avec sentiment, type, thèmes et formalité"
        # )
        
        # Tâche 2: Extraction d'informations
        # extraction_task = Task(
        #     description=f"""
        #     Trouve lorsque la parole change et dentifie l'habitant et le citoyen dans la discussion. Tu identifie clairement le Militant et le Citoyen et tu structure le dialogue.
        #     Texte à analyser : {text_input}
        #     """,
        #     agent=info_extractor,
        #     expected_output="Un texte dialogué séparé par des retours à la ligne, avec - Militant ou habitant  : dialogue   "
        # )
        

        extraction_task = Task(
            description=f"""
        Identifie les changements de locuteur et attribue chaque partie au bon interlocuteur : Militant ou Citoyen. Structure le texte de façon lisible.

        Utilise le format suivant :
        - Militant : [texte]
        - Citoyen : [texte]

        Ne te base pas sur la ponctuation. Reformule si nécessaire pour rendre le propos plus clair.

        Texte à analyser : {text_input}
        """,
            agent=info_extractor,
            expected_output="Dialogue structuré ligne par ligne avec les rôles clairement identifiés."
        )
        
        # Tâche 3: Résumé et reformulation
        summary_task = Task(
            description=f"""
            En analysant le dialogue
            
            Texte original : {text_input}
            
            Fais une synthèse en identifiant les points clefs mensionné dans le dialogue.
            """,
            agent=summarizer,
            expected_output="Résumé en maximum 20 lignes, reformulation claire, point principaux abordée et synthèse de ce qui a été dit concernant ces points",
            context=[ extraction_task]  # Utilise les résultats des tâches précédentes
        )
        
        return [extraction_task, summary_task]
    
    def process_text(self, text_input: str) -> dict:  # Retiré async car kickoff() n'est pas async
        """
        Lance le traitement complet du texte avec tous les agents
        """
        try:
            # Créer les agents
            agents = self.create_agents()
            
            # Créer les tâches
            tasks = self.create_tasks(text_input, agents)
            
            # Créer et lancer la crew
            crew = Crew(
                agents=list(agents),
                tasks=tasks,
                process=Process.sequential,  # Les tâches s'exécutent une par une
                verbose=True
            )
            print("Démarrage de l'analyse...")

            # Exécuter le workflow
            result = crew.kickoff()
            print("Analyse terminée avec succès!")
                
            # Récupérer les résultats individuels de chaque tâche
            extraction_result = tasks[0].output.raw if hasattr(tasks[0], 'output') and tasks[0].output else "Non disponible"
            summary_result = tasks[1].output.raw if hasattr(tasks[1], 'output') and tasks[1].output else "Non disponible"

            return {
                "success": True,
                "original_text": text_input,
                "dialogue_structure": extraction_result,  # Résultat de l'agent d'extraction
                "summary": summary_result,  # Résultat de l'agent de résumé
                "complete_result": str(result),  # Résultat complet de la crew
                "analysis_result": str(result),  # Gardé pour compatibilité
                "tasks_completed": len(tasks)
            }
            
        except Exception as e:
            print(f"Erreur lors de l'analyse: {str(e)}")
            return { 
                "success": False,
                "error": str(e),
                "original_text": text_input
            }

# Instance globale
def get_text_analysis_crew():
    """Factory function pour obtenir une instance de la crew"""
    if not hasattr(get_text_analysis_crew, '_instance'):
        get_text_analysis_crew._instance = TextAnalysisCrew()
    return get_text_analysis_crew._instance

# Exemple d'utilisation
if __name__ == "__main__":
    # Test du système
    crew = get_text_analysis_crew()
    
    sample_text = """
    Bonjour madame, je suis militant pour le parti XYZ, j'aimerais discuter avec vous de nos propositions.
    
    Ah bonjour, écoutez je n'ai pas trop le temps là...
    
    Je comprends, juste 2 minutes. Que pensez-vous de la situation économique actuelle ?
    
    Franchement c'est difficile, les prix augmentent, mon pouvoir d'achat diminue. Et vous proposez quoi concrètement ?
    
    Nous avons un plan pour augmenter le SMIC de 200 euros et baisser la TVA sur les produits essentiels.
    
    Ah ça c'est intéressant ! Et pour l'environnement, vous comptez faire quoi ?
    
    Nous voulons développer les transports en commun et installer plus de bornes électriques.
    
    D'accord, merci pour ces informations. Je vais y réfléchir.
    """
    
    result = crew.process_text(sample_text)
    
    if result["success"]:
        print("=" * 50)
        print("RÉSULTAT DE L'ANALYSE")
        print("=" * 50)
        
        print("\n📝 DIALOGUE STRUCTURÉ:")
        print("-" * 30)
        print(result["dialogue_structure"])
        
        print("\n📋 RÉSUMÉ ET SYNTHÈSE:")
        print("-" * 30)
        print(result["summary"])
        
        print("\n🔍 RÉSULTAT COMPLET:")
        print("-" * 30)
        print(result["complete_result"])
    else:
        print(f"Erreur: {result['error']}")