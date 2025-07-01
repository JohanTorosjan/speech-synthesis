import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service router;
  @service modal;
@service auth;
  beforeModel() {
    //         this.router.transitionTo('synthese', {
    //   queryParams: { id: 1 },
    // });

    if(!this.auth.isLogged){
      this.modal.openLogging()
    }

    if(window.location.href.includes("synthese")){
      return
    }

    if(window.location.href.includes("admin")){
      return
    }
    this.router.transitionTo('record');
  }
}
