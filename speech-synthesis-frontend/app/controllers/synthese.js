import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class SyntheseController extends Controller {
  @tracked selectedType = 'Synthèse';
  @service modal;

  formatDateToFrenchString(date) {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  }
  get displayedMail() {
    const date = new Date(this.model.created_at);
    const formattedDate = this.formatDateToFrenchString(date);

    return `Cher Madame/Monsieur,\n\nSuite à notre entrevue du ${formattedDate}, veuillez trouver ci-joint la synthèse. \n------------------\nSynthèse :\n${this.model.analysis_result}\n------------------\n Afin d'exercer votre droit à la supression des données, merci d'envoyer un mail à dev5minutespourmontpellier@gmail.com
        `;
  }
  get displayContent() {
    if (this.selectedType === 'Dialogue') {
      return this.model.dialogue_structure;
    }

    if (this.selectedType === 'Synthèse') {
      return this.model.analysis_result;
    }
    if (this.selectedType === 'Mail') {
      return this.displayedMail;
    }
  }

  @action
  selectType(type) {
    this.selectedType = type;
  }

  @action
  sendContent() {
    const email = this.model.citizen_email || '';
    const subject = encodeURIComponent("Synthèse par IA de l'entrevue");
    const body = encodeURIComponent(this.displayedMail);

    // Construit le lien mailto
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    // Redirige vers le lien
    window.location.href = mailtoLink;
  }

  @action
  copyContent() {
    navigator.clipboard.writeText(this.displayContent).then(() => {});
  }


  @action
  openModale(){
    this.modal.open("Commencer un nouveau dialogue ?","Cette action supprimera la synthèse courrante","reset")

  }
}
