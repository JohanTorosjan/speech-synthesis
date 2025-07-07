// app/services/auth.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthAdminService extends Service {
  @tracked isAuthenticated = false;
  @tracked token = null;

  constructor() {
    super(...arguments);
    this.checkExistingAuth();
  }

  checkExistingAuth() {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      this.verifyToken(savedToken);
    }
  }


  async checkToken(){
 try {
     const savedToken = localStorage.getItem('admin_token');
      const response = await fetch(`https://api.applicitoyenne.fr/auth/verify-admin?token=${encodeURIComponent(savedToken)}`);
      const data = await response.json();

      return data.valid
  }
  catch(erreur){
    console.log(erreur)
    return false
  }

}

  
  @action
  async authenticateWithCode(code) {
    try {
      const response = await fetch('https://api.applicitoyenne.fr/auth/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        this.token = data.token;
        this.isAuthenticated = true;
        localStorage.setItem('admin_token', data.token);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.detail || 'Code invalide' };
      }
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      return { success: false, message: 'Erreur de connexion' };
    }
  }

  @action
  async verifyToken(token) {
    try {
      const response = await fetch(`https://api.applicitoyenne.fr/auth/verify-admin?token=${encodeURIComponent(token)}`);
      const data = await response.json();
      if (response.ok && data.valid && data.admin) {
        this.token = token;
        this.isAuthenticated = true;
        return true;
      } else {
        this.logout();
        return false;
      }
    } catch (error) {
      console.error('Erreur de vérification du token:', error);
      this.logout();
      return false;
    }
  }

  @action
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    localStorage.removeItem('admin_token');
  }

  // Méthode utilitaire pour faire des requêtes authentifiées
  async authenticatedFetch(url, options = {}) {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      ...options.headers
    };

    const response = await fetch(url, { ...options, headers });
    
    // Si le token est expiré ou invalide, déconnecter
    if (response.status === 401) {
      this.logout();
      throw new Error('Session expirée');
    }
    
    return response;
  }
}