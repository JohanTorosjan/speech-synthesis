import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class AuthService extends Service {

  @tracked isAuthed = false;


  get isLogged(){
   
   this.isAuthed = localStorage.getItem('isLogged')
   console.log(this.isAuthed)
    if(this.isAuthed=='true'){
        
        return true
    }
    return false
  }

  loggin(){
    localStorage.setItem('isLogged', true);
  }


}
