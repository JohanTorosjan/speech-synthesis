import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ModalService extends Service {
  @tracked isOpen = false;
  @tracked title = 'title';
  @tracked content = 'content';
  @tracked type = "";
  @tracked exportDate;
  @tracked showLogging = false;
  @tracked showExport = false;
@tracked showMilitant = false;

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

  closeLogging(){
      this.showLogging=false;

}
  openLogging(){
    this.showLogging=true;
  }



  closeExport(){
      this.showExport=false;

}

  openExport(exportDate){
    this.exportDate = exportDate
    this.showExport=true;
  }

  openMilitant(){
      this.showMilitant=true;

}

  closeMilitant(){
  
    this.showMilitant=false;
  }



}
