import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class ExportSelector extends Component {

  @service store;
    @service modal
  @tracked exportAll = false;
  @tracked startDate = '';
  @tracked endDate = '';
  @tracked isExporting = false;
  @tracked errorMessage = '';
  @tracked successMessage = '';

  constructor() {
    super(...arguments);
    
    // Initialiser les dates avec la date passée en argument, ou la date d'aujourd'hui
    const defaultDate = this.args.date || new Date();
    const formattedDate = this.formatDateForInput(defaultDate);
    
    this.startDate = formattedDate;
    this.endDate = formattedDate;
  }

  /**
   * Formate une date pour l'input HTML date (YYYY-MM-DD)
   */
  formatDateForInput(date) {
    if (!date) return '';
    
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
   formatDateToFrenchShort(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return ` ${hour} h  ${minutes}`;
}

  @action
  toggleExportAll(event) {
    this.exportAll = event.target.checked;
    this.clearMessages();
  }

  @action
  updateStartDate(event) {
    this.startDate = event.target.value;
    this.clearMessages();
  }

  @action
  updateEndDate(event) {
    this.endDate = event.target.value;
    this.clearMessages();
  }

  @action
  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  @action
  closeModal() {
    // Émets un événement pour fermer la modal
   this.modal.closeExport()
  }

  @action
  async exportSyntheses() {
    this.clearMessages();
    this.isExporting = true;

    try {
      // Validation des dates si on n'exporte pas tout
      if (!this.exportAll) {
        if (!this.startDate || !this.endDate) {
          throw new Error('Veuillez sélectionner une date de début et une date de fin');
        }
        
        if (new Date(this.startDate) > new Date(this.endDate)) {
          throw new Error('La date de début doit être antérieure à la date de fin');
        }
      }

      const token = localStorage.getItem("admin_token");
      const baseUrl = 'http://localhost:8000'; // Ajuste selon ton environnement
      
      let url;
      if (this.exportAll) {
        // Utiliser la route originale sans filtre de date
        url = `${baseUrl}/admin/synthesis?offset=0&sort=-created_at`;
      } else {
        // Utiliser la route avec intervalle de dates
        url = `${baseUrl}/admin/synthesis/date-range?start_date=${this.startDate}&end_date=${this.endDate}&offset=0&sort=-created_at`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      // Traiter les données pour l'export
      await this.processExportData(data);
      
      this.successMessage = `${data.count} synthèse(s) exportée(s) avec succès`;
      
      // Fermer la modal après un délai
      setTimeout(() => {
        this.closeModal();
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de l\'exportation:', error);
      this.errorMessage = error.message || 'Une erreur est survenue lors de l\'exportation';
    } finally {
      this.isExporting = false;
    }
  }

  /**
   * Traite les données et déclenche le téléchargement
   */
  async processExportData(apiResponse) {
    const { data, count } = apiResponse;
    
    if (count === 0) {
      throw new Error('Aucune synthèse trouvée pour la période sélectionnée');
    }

    // Créer le CSV
    const csvContent = this.convertToCSV(data);
    
    // Créer le nom du fichier
    let filename;
    if (this.exportAll) {
      filename = `syntheses_all_${new Date().toISOString().split('T')[0]}.csv`;
    } else {
      filename = `syntheses_${this.startDate}_to_${this.endDate}.csv`;
    }
    
    // Déclencher le téléchargement
    this.downloadCSV(csvContent, filename);
  }

  /**
   * Convertit les données en format CSV
   */
  convertToCSV(data) {
    if (!data || data.length === 0) {
      return '';
    }

    // En-têtes CSV
    const headers = [
      'ID',
      'Prénom Militant',
      'Nom Militant',
      'Prénom Citoyen',
      'Nom Citoyen',
      'Email',
      'Date de naissance',
      'Texte original',
      'Résultat analyse',
      'Structure dialogue',
      'Tâches complétées',
      'Date création',
      'Heure,'
    ];

    // Convertir les données
    const rows = data.map(item => [
      item.id || '',
      item.militant_prenom || '',
      item.militant_nom || '',
      item.citizen_firstname || '',
      item.citizen_lastname || '',
      item.citizen_email || '',
      item.citizen_dob || '',
      `"${(item.original_text || '').replace(/"/g, '""')}"`, // Échapper les guillemets
      `"${(item.analysis_result || '').replace(/"/g, '""')}"`,
      `"${(item.dialogue_structure || '').replace(/"/g, '""')}"`,
      item.tasks_completed || '',
      this.formatDateForInput(item.created_at) || '',
      this.formatDateToFrenchShort(item.created_at) || '',
        ]);

    // Assembler le CSV
    const csvLines = [headers.join(','), ...rows.map(row => row.join(','))];
    return csvLines.join('\n');
  }

  /**
   * Déclenche le téléchargement du fichier CSV
   */
  downloadCSV(csvContent, filename) {
    const BOM = '\uFEFF'; // BOM pour l'UTF-8
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

}
