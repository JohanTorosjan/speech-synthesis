// app/services/auth-militant.js
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthService extends Service {
  @tracked isAuthenticated = false;
  @tracked token = null;
  @tracked militantName = null;
  @tracked militantId = null;

  constructor() {
    super(...arguments);
    this.checkExistingAuth();
  }

  checkExistingAuth() {
    const savedToken = localStorage.getItem('militant_token');
    if (savedToken) {
      this.verifyToken(savedToken);
    }
  }

  async checkToken() {
    try {
      const savedToken = localStorage.getItem('militant_token');
      if (!savedToken) {
              debugger

        return false;
      }
      
      const response = await fetch(`http://localhost:8000/auth/verify-militant?token=${encodeURIComponent(savedToken)}`);
      const data = await response.json();
      console.log(data)
      return data.valid && data.militant;
    } catch (erreur) {
      debugger
      console.log(erreur);
      return false;
    }
  }

  @action
  async authenticateWithCode(code) {
    try {
      const response = await fetch('http://localhost:8000/auth/militant', {
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
        this.militantName = data.militant_name;
        
        // Décoder le token pour récupérer l'ID (optionnel, sinon faire un appel verify)
        try {
          const payload = this.decodeToken(data.token);
          this.militantId = payload.militant_id;
        } catch (e) {
          console.warn('Impossible de décoder le token:', e);
        }
        
        localStorage.setItem('militant_token', data.token);
        return { success: true, message: data.message, militant_name: data.militant_name };
      } else {
        return { success: false, message: data.detail || 'Code militant invalide' };
      }
    } catch (error) {
      console.error('Erreur d\'authentification militant:', error);
      return { success: false, message: 'Erreur de connexion' };
    }
  }

  @action
  async verifyToken(token) {
    try {
      const response = await fetch(`http://localhost:8000/auth/verify-militant?token=${encodeURIComponent(token)}`);
      const data = await response.json();
      
      if (response.ok && data.valid && data.militant) {
        this.token = token;
        this.isAuthenticated = true;
        this.militantName = data.nom;
        this.militantId = data.militant_id;
        return true;
      } else {
        this.logout();
        return false;
      }
    } catch (error) {
      console.error('Erreur de vérification du token militant:', error);
      this.logout();
      return false;
    }
  }
@service modal;
  @action
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.militantName = null;
    this.militantId = null;
    localStorage.removeItem('militant_token');
    this.modal.openLogging()
  }

  // Méthode utilitaire pour décoder le token JWT côté client (optionnel)
  decodeToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Token invalide');
    }
  }

  // Méthode utilitaire pour faire des requêtes authentifiées
  async authenticatedFetch(url, options = {}) {
    if (!this.token) {
      throw new Error('Militant non authentifié');
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

  // Getters utiles
  get isLogged() {
    return this.isAuthenticated;
  }

  get currentMilitant() {
    if (!this.isAuthenticated) {
      return null;
    }
    
    return {
      id: this.militantId,
      nom: this.militantName,
      token: this.token
    };
  }
}