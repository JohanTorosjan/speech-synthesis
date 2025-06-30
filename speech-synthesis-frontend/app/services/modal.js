import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ModalService extends Service {
  @tracked isOpen = false;
  @tracked title = 'title';
  @tracked content = 'content';
  @tracked type = "";
  


  open(title,content,type) {
    this.title = title
    this.content = content
    this.type = type;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.title = '';
    this.content = '';

  }
}
