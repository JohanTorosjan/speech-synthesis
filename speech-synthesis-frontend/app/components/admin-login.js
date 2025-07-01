// app/components/admin-login.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AdminLoginComponent extends Component {
  @service authAdmin;
  @service router;

  @tracked adminCode = '';
  @tracked isLoading = false;
  @tracked errorMessage = '';

  @action
  updateCode(event) {
    this.adminCode = event.target.value;
    this.errorMessage = '';
  }

  @action
  async submitLogin(event) {
    event.preventDefault();
    
    if (!this.adminCode.trim()) {
      this.errorMessage = 'Veuillez saisir le code d\'administration';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const result = await this.authAdmin.authenticateWithCode(this.adminCode);
      
      if (result.success) {
        // Rediriger vers la page admin
        this.router.transitionTo('admin.dashboard');
      } else {
        this.errorMessage = result.message;
      }
    } catch (error) {
      this.errorMessage = 'Erreur de connexion';
    } finally {
      this.isLoading = false;
    }
  }

  @action
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.submitLogin(event);
    }
  }
}