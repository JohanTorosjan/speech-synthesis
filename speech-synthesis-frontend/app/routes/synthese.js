import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class SyntheseRoute extends Route {
  @service store;
  @service router;
  queryParams = {
    id: {
      refreshModel: true,
    },
  };
  async model(params) {
    try {
      const response = await fetch(
        `https://speech-synthesis-backend-production.up.railway.app/synthese/${params.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        if (response.status === 404) {
          // Rediriger vers une page d'erreur ou liste des synthèses
          this.router.transitionTo('syntheses'); // ou 'error'
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const synthese = await response.json();

      // Optionnel: transformation des dates
      if (synthese.created_at) {
        synthese.created_at = new Date(synthese.created_at);
      }
      if (synthese.updated_at) {
        synthese.updated_at = new Date(synthese.updated_at);
      }
      if (synthese.citizen_dob) {
        synthese.citizen_dob = new Date(synthese.citizen_dob);
      }
      console.log(synthese);
      return synthese;
    } catch (error) {
      console.error('Erreur lors de la récupération de la synthèse:', error);
      // Optionnel: redirection vers page d'erreur
      this.router.transitionTo('error');
      throw error;
    }
  }
}
