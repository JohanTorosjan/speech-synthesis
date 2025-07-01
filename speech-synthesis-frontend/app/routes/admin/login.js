import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AdminLoginRoute extends Route {
  @service authAdmin;
  @service router;

  beforeModel() {
    // Si déjà authentifié, rediriger vers le dashboard
    if (this.authAdmin.isAuthenticated) {
      this.router.transitionTo('admin.dashboard');
    }
  }
}
