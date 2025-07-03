import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ModalDialog extends Component {
@service modal
@service aiAgents
@service audioRecorder
@service router

@action
async deleteSynthese(){
    this.aiAgents.reset()
    this.audioRecorder.reset()
    this.modal.close()
    const currentURL = window.location.href;
 if (currentURL.includes("record")) {
    window.location.reload();
    }

    await this.router.transitionTo('record');

}

@action
closeModal(){
    this.modal.close()
}


}
