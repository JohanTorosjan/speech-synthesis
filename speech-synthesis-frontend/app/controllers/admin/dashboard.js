import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DashboardController extends Controller {
  // Propriétés trackées
  @tracked searchTerm = '';
  @tracked selectedCategory = '';
  @tracked sortColumn = 'name';
  @tracked sortAsc = true;
  @tracked currentPage = 1;
  @tracked itemsPerPage = 10;
  @tracked isLoading = false;
  @tracked allSelected = false;
  @service authAdmin
  @service router
@service modal 

  // Configuration du tableau
  tableTitle = 'Gestion des Utilisateurs';
  showCheckboxes = true;
  showActions = true;
  showPagination = true;
  emptyMessage = 'Aucun utilisateur trouvé. Commencez par en ajouter un !';


   formatDateToFrenchShort(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return ` ${hour} h  ${minutes}`;
}


formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois de 0 à 11
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
}


@tracked date;

get dateSelected(){
  let date = new Date()
  const offset = Number(this.date) || 0; // Convertit en nombre, fallback à 0 si NaN
   date.setDate(date.getDate() + offset);
   return  this.formatDate(date)

    

}

  // Définition des colonnes
  columns = [
        {
      key: 'created_at',
      label: 'Heure',
      class: 'date-column',
      isDate: true
    },
    {
      key: 'name',
      label: 'Nom',
      class: 'name-column',
      isCustom: false
    },
    {
      key: 'email',
      label: 'Email',
      class: 'email-column',
      isCustom: false
    },

    {
      key: 'synthese',
      label: 'Synthèse',
      class: 'synthese',
      isCustom: true
    }
  ];



  @tracked datas = null


@computed('datas')

get rawData(){

  if(this.datas===null){
  return this.model.data.map((data)=>{
    const name = data.citizen_firstname!==null?data.citizen_firstname:''
const lastName = data.citizen_lastname!==null?data.citizen_lastname:''


    return{
      created_at:this.formatDateToFrenchShort(data.created_at),
      name:`${name} ${lastName}`,
      email:data?.citizen_email,
      synthese:data.id
  }
}
)
  }

  else{
    return this.datas.data.map((data)=>{
const name = data.citizen_firstname!==null?data.citizen_firstname:''
const lastName = data.citizen_lastname!==null?data.citizen_lastname:''

    return{
      created_at:this.formatDateToFrenchShort(data.created_at),
      name:`${name} ${lastName}`,
      email:data?.citizen_email,
            synthese:data.id

  }
}
)
  }
}
  // Computed properties
  @computed('rawData', 'searchTerm', 'selectedCategory')
  get filteredData() {
    let data = this.rawData;

    // Filtre par recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      data = data.filter(item => 
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.role.toLowerCase().includes(term)
      );
    }

    // Filtre par catégorie
    if (this.selectedCategory) {
      data = data.filter(item => item.role === this.selectedCategory);
    }

    return data;
  }

  @computed('filteredData', 'sortColumn', 'sortAsc')
  get sortedData() {
    const data = [...this.filteredData];
    
    return data.sort((a, b) => {
      let aVal = a[this.sortColumn];
      let bVal = b[this.sortColumn];

      // Gestion des dates
      if (aVal instanceof Date && bVal instanceof Date) {
        aVal = aVal.getTime();
        bVal = bVal.getTime();
      }
      
      // Gestion des chaînes
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      let result = 0;
      if (aVal < bVal) result = -1;
      if (aVal > bVal) result = 1;

      return this.sortAsc ? result : -result;
    });
  }

  @computed('sortedData', 'currentPage', 'itemsPerPage')
  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.sortedData.slice(start, end);
  }

  @computed('filteredData.length')
  get totalItems() {
    return this.filteredData.length;
  }

  @computed('totalItems', 'itemsPerPage')
  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  @computed('paginatedData.length')
  get hasData() {
    return this.paginatedData.length > 0;
  }

  @computed('currentPage', 'itemsPerPage', 'totalItems')
  get startIndex() {
    if (this.totalItems === 0) return 0;
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  @computed('currentPage', 'itemsPerPage', 'totalItems')
  get endIndex() {
    const end = this.currentPage * this.itemsPerPage;
    return Math.min(end, this.totalItems);
  }

  @computed('currentPage', 'totalPages')
  get hasPrevious() {
    return this.currentPage > 1;
  }

  @computed('currentPage', 'totalPages')
  get hasNext() {
    return this.currentPage < this.totalPages;
  }

  @computed('currentPage', 'totalPages')
  get pageNumbers() {
    const pages = [];
    const current = this.currentPage;
    const total = this.totalPages;
    
    // Toujours afficher la première page
    if (total > 0) {
      pages.push({ number: 1, isCurrent: current === 1, isDots: false });
    }
    
    // Ajouter des points si nécessaire
    if (current > 3) {
      pages.push({ isDots: true });
    }
    
    // Pages autour de la page courante
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push({ number: i, isCurrent: current === i, isDots: false });
    }
    
    // Ajouter des points si nécessaire
    if (current < total - 2) {
      pages.push({ isDots: true });
    }
    
    // Toujours afficher la dernière page
    if (total > 1) {
      pages.push({ number: total, isCurrent: current === total, isDots: false });
    }
    
    return pages;
  }

  @computed('columns.length', 'showCheckboxes', 'showActions')
  get totalColumns() {
    let count = this.columns.length;
    if (this.showCheckboxes) count++;
    if (this.showActions) count++;
    return count;
  }

  // Actions
  @action
  filterTable() {
    this.currentPage = 1; // Reset à la première page lors d'une recherche
  }

  @action
  filterByCategory(category) {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  @action
  sortBy(column) {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
  }

  @action
  selectRow(item) {
    item.isSelected = !item.isSelected;
    this.updateAllSelectedState();
  }

  @action
  toggleItem(item) {
    item.isSelected = !item.isSelected;
    this.updateAllSelectedState();
  }

  @action
  toggleAll() {
    this.allSelected = !this.allSelected;
    this.paginatedData.forEach(item => {
      item.isSelected = this.allSelected;
    });
  }

  updateAllSelectedState() {
    const selectedCount = this.paginatedData.filter(item => item.isSelected).length;
    this.allSelected = selectedCount === this.paginatedData.length && selectedCount > 0;
  }

  @action
 async previousPage() {
  let newdate = Number(this.date) || 0;
  newdate = newdate - 1;
  
  // Mettre à jour le paramètre
  this.set('date', newdate);
  
  // Recharger les données manuellement
  try {
    const newModel = await this.loadData(newdate);
    this.datas = newModel
    //this.set('model', newModel);
  } catch (error) {
    console.error('Erreur lors du rechargement:', error);
  }
  
  if (this.hasNext) {
    this.currentPage++;
  }
  }

@action
async nextPage() {
  let newdate = Number(this.date) || 0;
  newdate = newdate + 1;
  
  // Mettre à jour le paramètre
  this.set('date', newdate);
  
  // Recharger les données manuellement
  try {
    const newModel = await this.loadData(newdate);
    this.datas = newModel
    //this.set('model', newModel);
  } catch (error) {
    console.error('Erreur lors du rechargement:', error);
  }
  
  if (this.hasNext) {
    this.currentPage++;
  }
}

async loadData(dateOffset) {
  let date = new Date();
  const offset = Number(dateOffset) || 0;
  date.setDate(date.getDate() + offset);
  
  const response = await this.authAdmin.authenticatedFetch(
    `http://localhost:8000/admin/synthesis?offset=0&sort=-created_at&start_date=${this.formatDate(date)}`
  );
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return await response.json();
}

formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}







  
  @action
  goToPage(page) {
    this.currentPage = page;
  }

  @action
  changeItemsPerPage(newSize) {
    this.itemsPerPage = parseInt(newSize, 10);
    this.currentPage = 1;
  }

  // Actions du tableau
  @action
  addItem() {
    console.log('Ajouter un nouvel utilisateur');
    // Simuler l'ajout
    alert('Fonctionnalité d\'ajout à implémenter');
  }

  @action
  editItem(item) {
    console.log('Modifier:', item);
    alert(`Modifier l'utilisateur: ${item.name}`);
  }

  @action
  viewItem(item) {
    console.log('Voir:', item);
    alert(`Voir les détails de: ${item.name}`);
  }

  @action
  deleteItem(item) {
    console.log('Supprimer:', item);
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${item.name} ?`)) {
      const index = this.rawData.findIndex(u => u.id === item.id);
      if (index > -1) {
        this.rawData.splice(index, 1);
        // Forcer la mise à jour
        this.rawData = [...this.rawData];
      }
    }
  }

  @action
  exportData() {
    console.log('Exporter les données');
    alert('Fonctionnalité d\'export à implémenter');
  }


  @action
  openSynthese(item){
const url = this.router.urlFor('synthese', {
  queryParams: { id: item.synthese },
});
window.open(url, '_blank');

  }
}

