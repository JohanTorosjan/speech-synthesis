// informations-form.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class InformationsForm extends Component {
  @tracked firstName = '';
  @tracked lastName = '';
  @tracked mail = '';
  @tracked dob = '';
  @tracked formError = false;

  @service router;
  @service aiAgents;
  @service modal;

  @action
  updateFirstName(event) {
    this.firstName = event.target.value;
  }

  @action
  updateLastName(event) {
    this.lastName = event.target.value;
  }

  @action
  updateMail(event) {
    this.mail = event.target.value;
  }

  @action
  updateDob(event) {
    let value = event.target.value.replace(/\D/g, ''); // Supprimer tout ce qui n'est pas un chiffre

    // Limiter à 8 chiffres maximum
    if (value.length > 8) {
      value = value.substring(0, 8);
    }

    // Ajouter les barres obliques automatiquement
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length >= 5) {
      value = value.substring(0, 5) + '/' + value.substring(5);
    }

    this.dob = value;
  }

  get shouldRegisterCitizen() {
    return (
      this.firstName.length > 0 ||
      this.lastName.length > 0 ||
      this.mail.length > 0 ||
      this.firstName.dob > 0
    );
  }

  @action
  validateDob(event) {
    const dateValue = event.target.value;
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    if (dateValue && !dateRegex.test(dateValue)) {
      event.target.style.borderColor = '#ff4444';
      event.target.style.boxShadow = '0 2px 10px rgba(255, 68, 68, 0.2)';
    } else {
      event.target.style.borderColor = '';
      event.target.style.boxShadow = '';
    }
  }

  @action
  handleKeyPress(event) {
    const char = String.fromCharCode(event.which);
    if (!/[\d\/]/.test(char)) {
      event.preventDefault();
    }
  }

  @action
  async submitForm(event) {
    event.preventDefault();

    if (this.aiAgents.isLoading) {
      return;
    }

    if (this.shouldRegisterCitizen) {
      const synthesisId = this.aiAgents.id; // Assumant que vous avez cette propriété
      const [day, month, year] = this.dob.split('/');
      const isoDate = `${year}-${month?.padStart(2, '0')}-${day?.padStart(2, '0')}`;
      const response = await fetch(
        `https://speech-synthesis-backend-production.up.railway.app/synthesis/${synthesisId}/citizen`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            citizen_firstname: this.firstName,
            citizen_lastname: this.lastName,
            citizen_email: this.mail,
            citizen_dob: isoDate,
          }),
        },
      );

      if (response.status !== 200) {
        this.formError = true;
        console.log('ERREUR FORM');
      }
      /// RESET App
    }

    this.router.transitionTo('synthese', {
      queryParams: { id: this.aiAgents.id },
    });
  }




      @action openModale(){
      this.modal.open("Supprimer la synthèse ?","Etes vous sure de vouloir supprimer cet enregistrement ? Cette action est irréversible.","delete")
    }
}
