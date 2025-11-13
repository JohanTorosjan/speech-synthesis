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
    let toSend= '';
    if (this.selectedType === 'Dialogue') {
      toSend = this.model.dialogue_structure;
    }

    if (this.selectedType === 'Synthèse') {
        toSend = this.model.analysis_result;
    }
    if (this.selectedType === 'Mail') {
        toSend = `\n Synthèse : ${this.model.analysis_result} \n \n Dialogue : ${this.model.dialogue_structure}`;
    }

    return `Cher Madame/Monsieur,\n\nSuite à notre entrevue du ${formattedDate}, veuillez trouver ci-joint la synthèse. Celle-ci est réalisée avec une Intelligence Artificielle sur la basse de la reconnaissance vocale de notre échange.
Il n’y a pas eu d’enregistrement sur des serveurs.
Ce traitement étant automatique, il peut évidemment y avoir des erreurs, et des malentendus dus au traitement automatique de la machine.
Vous pouvez en répondant à ce mail corriger, ou apporter des éléments.
Cet entretien ne fera l’objet d’aucun traitement ni automatique ni manuel individualisé : il reste anonyme à moins que vous nous informiez du contraire.
 \n------------------\n${toSend}\n------------------\n Les Ecologistes pour Montpellier 
Retrouvez nous sur notre site Internet : https://ecologistespourmontpellier.fr/
06 86 53 49 51 
 \n------------------\n
Afin d'exercer votre droit à la supression des données, merci d'envoyer un mail à dev5minutespourmontpellier@gmail.com
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
    this.modal.open("Commencer un nouveau dialogue ?","Vous ne pourrez plus accéder à cette synthèse.","reset")

  }
}
