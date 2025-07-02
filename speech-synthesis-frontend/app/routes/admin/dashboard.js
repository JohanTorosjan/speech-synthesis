import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AdminDashboardRoute extends Route {
  @service authAdmin;
  @service router;

    queryParams = {
    page: {
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

  async model(params) {
    let offset = 10

    try {
        if(params.page){
            offset = 10*params.page 
        }
        else{
            offset = 0
        }
      // Exemple d'appel API authentifié
      const response = await this.authAdmin.authenticatedFetch(`http://localhost:8000/admin/synthesis?limit=10&offset=${offset}&sort=-created_at`);
      
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