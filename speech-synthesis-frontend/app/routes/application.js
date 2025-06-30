import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service router;
  beforeModel() {
    //         this.router.transitionTo('synthese', {
    //   queryParams: { id: 1 },
    // });

    if(window.location.href.includes("synthese")){
      return
    }
    this.router.transitionTo('record');
  }
}
