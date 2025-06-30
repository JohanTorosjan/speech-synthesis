import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RecordingButton extends Component {
  @tracked state = 'start';
  @service audioRecorder;

  @action
  async onClick() {
    this.args.onClick();
    switch (this.state) {
      case 'start':
        await this.audioRecorder.startStreaming();
        this.state = 'pause';
        break;
      case 'pause':
        await this.audioRecorder.stopStreaming();
        this.state = 'resume';
        break;
      case 'resume':
        await this.audioRecorder.startStreaming();

        this.state = 'pause';
        break;
    }
  }
}
