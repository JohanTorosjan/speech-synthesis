 import Controller from '@ember/controller';
 import { action } from '@ember/object';

 
 export default class HomeController extends Controller {


    @action
    contactMr(){
    const mailtoLink = `mailto:Contact@applicitoyenne.fr`;

    // Redirige vers le lien
    window.location.href = mailtoLink;
    }
    @action
    scrollToContact(event){
         event?.preventDefault();

  const element = document.querySelector(".c11-b"); // ta div avec la class
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });

  }
   const mailtoLink = `mailto:Contact@applicitoyenne.fr`;

    // Redirige vers le lien
    window.location.href = mailtoLink;
    }

        @action
    scrollToPlus(event){
         event?.preventDefault();

  const element = document.querySelector(".c11-b"); // ta div avec la class
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
    }


        @action
    scrollToMinutes(event){
         event?.preventDefault();

  const element = document.querySelector(".b1"); // ta div avec la class
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
    }

 @action
  scrollToSection(event) {
    event.preventDefault();
    
    // Récupérer l'ID de la section depuis le href
    const targetId = event.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Scroll fluide vers la section
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Optionnel : ajouter une classe active au lien cliqué
      this.updateActiveLink(event.target);
    }
  }
  
  updateActiveLink(clickedLink) {
    // Retirer la classe active de tous les liens
    const allLinks = document.querySelectorAll('.sommaire-link');
    allLinks.forEach(link => link.classList.remove('active'));
    
    // Ajouter la classe active au lien cliqué
    clickedLink.classList.add('active');
  }
 }
 
