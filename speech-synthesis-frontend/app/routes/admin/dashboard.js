import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { queryParam } from '@ember/service';
import { action } from '@ember/object';

export default class AdminDashboardRoute extends Route {
  @service authAdmin;
  @service router;

    queryParams = {
    date: {
      refreshModel: true,
    },
  };


  beforeModel() {
    // Vérifier l'authentification
    if (!this.authAdmin.isAuthenticated) {
      this.router.transitionTo('admin.login');
      return;
    }
  }

  @action
  refreshModel() {
    this.refresh();
  }
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois de 0 à 11
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  async model(params) {
    let date = new Date();
    // if(params.date){
    //   const offset = Number(params.date) || 0; // Convertit en nombre, fallback à 0 si NaN

    //   date.setDate(date.getDate() + offset);
    // } 

    try {

      // Exemple d'appel API authentifié
      const response = await this.authAdmin.authenticatedFetch(`http://localhost:8000/admin/synthesis?offset=0&sort=-created_at&start_date=${this.formatDate(date)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors du chargement des données admin:', error);
      
      // Si erreur d'authentification, rediriger vers login
      if (error.message.includes('Session expirée') || error.message.includes('Non authentifié')) {
        this.router.transitionTo('admin.login');
      }
      
      // Retourner un objet d'erreur pour l'affichage
      return { error: error.message };
    }
  }
}