import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class VoiceRecorder extends Component {
  @service audioRecorder;
  @service modal
  @service aiAgents;
  @tracked timeCounter = 0; // en secondes
  @tracked state = 'start';
  timer = null;

  get formattedTime() {
    let minutes = Math.floor(this.timeCounter / 60);
    let seconds = this.timeCounter % 60;
    return `${minutes} : ${seconds.toString().padStart(2, '0')}`;
  }

  get recentTranscription() {
      const n = 60; // Remplace 100 par le nombre de caractères que tu veux
      const fullText = this.audioRecorder.fullTranscription.join(' ');
      return fullText.slice(-n);
  }

  handleTimer() {
    if (this.state === 'start') {
      if (this.timer) return; // évite les doublons
      this.timer = setInterval(() => {
        this.timeCounter++;
      }, 1000);
    }

    if (this.state === 'pause') {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    if (this.state === 'resume') {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.timeCounter++;
        }, 1000);
      }
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);
    clearInterval(this.timer);
  }
  @action
  async startRecording() {
    await this.audioRecorder.startStreaming();
  }

  @action
  async stopStreaming() {
    await this.audioRecorder.stopStreaming();
  }

  @action
  async getSynthese() {
    this.args.onGetSynthese();
    await this.aiAgents.getSynthese(this.audioRecorder.transcription);
  }

  get isActiveTranscription() {
    return this.audioRecorder.fullTranscription.length > 0;
  }

  @action async onClick() {
    this.handleTimer();

    switch (this.state) {
      case 'start':
        this.state = 'pause';
        break;
      case 'pause':
        this.state = 'resume';
        break;
      case 'resume':
        this.state = 'pause';
        break;
    }



    // if(this.state ==='start'){
    // this.state = "pause"
    // }
    // if(this.state==="pause"){
    //   this.state = "resume"
    // }
  }



    @action openModale(){
      this.modal.open("Supprimer la synthèse ?","Etes vous sure de vouloir supprimer cet enregistrement ? Cette action est irréversible.","delete")
    }
}
