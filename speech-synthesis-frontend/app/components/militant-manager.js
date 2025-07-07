import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MilitantManager extends Component {
  @service authAdmin;
  
  @tracked militants = [];
  @tracked isLoading = false;
  @tracked error = null;
  
  // Champs pour nouveau militant
  @tracked newMilitant = {
    nom: '',
    prenom: '',
    email: '',
    code: ''
  };
  
  // État des modifications pour chaque militant
  @tracked editingMilitants = new Map();
  @tracked modifiedMilitants = new Set();
@service modal;
  constructor() {
    super(...arguments);
    this.loadMilitants();
  }

  @action
  async loadMilitants() {
    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await this.authAdmin.authenticatedFetch('https://api.applicitoyenne.fr/admin/militants');
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      this.militants = data.militants || [];
      
      // Initialiser les données d'édition
      this.editingMilitants.clear();
      this.modifiedMilitants.clear();
      
      this.militants.forEach(militant => {
        this.editingMilitants.set(militant.id, {
          nom: militant.nom,
          prenom: militant.prenom,
          email: militant.email,
          code: militant.code
        });
      });
      
    } catch (error) {
      console.error('Erreur lors du chargement des militants:', error);
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  @action
  updateNewMilitantField(field, event) {
    let value = event.target.value

    if(field==="code"){
       
  value = value.replace(/\D/g, '').substring(0, 4);
    }

    this.newMilitant = {
      ...this.newMilitant,
      [field]:value
    };
  }

  @action
  updateMilitantField(militantId, field, event) {
let value = event.target.value

    if(field==="code"){
       
  value = value.replace(/\D/g, '').substring(0, 4);
    }

    const currentData = this.editingMilitants.get(militantId);
    const newData = {
      ...currentData,
      [field]: value
    };
    
    this.editingMilitants.set(militantId, newData);
    
    // Marquer comme modifié
    this.modifiedMilitants.add(militantId);
    
    // Forcer la mise à jour de l'affichage
    this.editingMilitants = new Map(this.editingMilitants);
    this.modifiedMilitants = new Set(this.modifiedMilitants);
  }

  @action
  async addMilitant() {
    // Vérifier que tous les champs sont remplis
    if (!this.newMilitant.nom || !this.newMilitant.prenom || 
        !this.newMilitant.email || !this.newMilitant.code) {
      alert('Veuillez remplir tous les champs');
      return;
    }

      if(this.newMilitant.code.length<4){
        alert('Le code doit faire 4 caractères');
      return;
    }
    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await this.authAdmin.authenticatedFetch('https://api.applicitoyenne.fr/admin/militants', {
        method: 'POST',
        body: JSON.stringify(this.newMilitant)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Erreur ${response.status}`);
      }
      
      // Réinitialiser le formulaire
      this.newMilitant = {
        nom: '',
        prenom: '',
        email: '',
        code: ''
      };
      
      // Recharger la liste
      await this.loadMilitants();
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout du militant:', error);
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }

@action
  async saveMilitant(militantId) {
    const editedData = this.editingMilitants.get(militantId);
    
    if (!editedData.nom || !editedData.prenom || !editedData.email || !editedData.code) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    if(editedData.code.length<4){
        alert('Le code doit faire 4 caractères');
      return;
    }

    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await this.authAdmin.authenticatedFetch(`https://api.applicitoyenne.fr/admin/militants/${militantId}`, {
        method: 'PUT',
        body: JSON.stringify(editedData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Erreur ${response.status}`);
      }
      
      // Mettre à jour localement
      const militantIndex = this.militants.findIndex(m => m.id === militantId);
      if (militantIndex !== -1) {
        this.militants[militantIndex] = {
          ...this.militants[militantIndex],
          ...editedData
        };
        
        // Retirer de la liste des modifiés
        this.modifiedMilitants.delete(militantId);
        this.modifiedMilitants = new Set(this.modifiedMilitants);
        
        alert('Militant sauvegardé avec succès');
      }
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }


  @action
  async deleteMilitant(militantId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce militant ?')) {
      return;
    }

    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await this.authAdmin.authenticatedFetch(`https://api.applicitoyenne.fr/admin/militants/${militantId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ actif: false })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Erreur ${response.status}`);
      }
      
      // Recharger la liste
      await this.loadMilitants();
      
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  // Getter pour savoir si un militant a été modifié
  get isModified() {
    return (militantId) => this.modifiedMilitants.has(militantId);
  }

  // Getter pour récupérer les données d'édition d'un militant
  get getEditingData() {
    return (militantId) => this.editingMilitants.get(militantId) || {};
  }



  @action
  closeMilitants(){
    this.modal.closeMilitant()
  }
}