import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AdminRoute extends Route {
  @service authAdmin;
  @service router;

   async beforeModel() {
    const response = await this.authAdmin.checkToken()
    // Vérifier si l'utilisateur est authentifié
    if (response==true) {
      this.router.transitionTo('admin.dashboard');
    }
    else{
        this.router.transitionTo('admin.login');
    }
  }
}