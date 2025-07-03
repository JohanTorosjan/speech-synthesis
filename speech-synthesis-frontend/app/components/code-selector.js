import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CodeSelector extends Component {
  @tracked code = [];
  @tracked wrongCode = false;
@service modal;
@service auth
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  @action
  async addDigit(number) {
    if (this.code.length < 4) {
      this.code = [...this.code, number];
      if (this.code.length === 4) {
        // Handle code entered
        console.log('Code entered:', this.code.join(''));


        try{

         const result = await this.auth.authenticateWithCode(this.code.join(''))
         if (result.success){
          this.modal.closeLogging()
         }
          else{
          
          this.wrongCode=true;
            this.code = []
        }

// const response = await fetch('http://localhost:8000/auth/militant', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           code: this.code.join('')
//         })
//       });
//             const data = await response.json();

//         if(data.success){
            
//             this.modal.closeLogging()
//             this.auth.loggin(data)
            
//         }
//         else{
          
//           this.wrongCode=true;
//             this.code = []
//         }

        }
        catch(error){
                      this.wrongCode=true;
            this.code = []
        }
       
        // You may trigger an action to close modal or validate here
      }
    }
  }

  @action
  clearLast() {
    this.code = this.code.slice(0, -1);
  }
}
