import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AiAgentsService extends Service {
  @tracked isLoading = false;
  @tracked synthese;
  @tracked originalText;
  @tracked dialogueStructure;
  @tracked error = false;
  @tracked id = 0;

  async getSynthese(discussionText) {
    this.isLoading = true;

    try {
      const response = await fetch('https://speech-synthesis-backend-production.up.railway.app/analyseDiscussion', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: discussionText,
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        this.dialogueStructure = result.dialogue_structure;
        this.synthese = result.analysis_result;
        this.originalText = result.original_text;
        this.id = result.id;
      } else {
        this.error = true;
      }
      console.log(result);
      return result;
    } catch (error) {
      console.error("Erreur lors de l'analyse de la discussion:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }


  reset() {
  console.log('♻️ Réinitialisation du service AiAgentsService...');

  this.isLoading = false;
  this.synthese = undefined;
  this.originalText = undefined;
  this.dialogueStructure = undefined;
  this.error = false;
  this.id = 0;

  console.log('✅ Service AiAgentsService réinitialisé');
}
}
