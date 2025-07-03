import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service router;
  @service modal;
  @service auth;

  async beforeModel() {
    const currentURL = window.location.href;
    
    if (currentURL.includes("admin")) {
      return;
    }

    try {
        const response = await this.auth.checkToken();
        console.log(response);
        
        if (response === false) {
            this.modal.openLogging();
        }
    } catch (error) {
        console.error('Erreur auth:', error);
        this.modal.openLogging();
        return;
    }

    if (currentURL.includes("synthese")) {
      return;
    }

    // Utiliser replaceWith pour éviter l'historique
    this.router.replaceWith('record');
  }
}