import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class RecordController extends Controller {
  @service aiAgents;
  @service router;
  @tracked displayForm = false;

  @action onGetSynthese() {
    this.displayForm = true;
    this.router.transitionTo('informations');
  }
}
