import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ModalDialog extends Component {
@service modal
@service aiAgents
@service audioRecorder
@service router
@action


deleteSynthese(){
    this.aiAgents.reset()
    this.audioRecorder.reset()
    this.modal.close()

window.location.href = '/record';

}

@action
closeModal(){
    this.modal.close()
}


}
