'use strict';



;define("speech-synthesis-frontend/app", ["exports", "@ember/application", "ember-resolver", "ember-load-initializers", "speech-synthesis-frontend/config/environment"], function (_exports, _application, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"ember-resolver",0,"ember-load-initializers",0,"speech-synthesis-frontend/config/environment"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class App extends _application.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);
      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);
      _defineProperty(this, "Resolver", _emberResolver.default);
    }
  }
  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  // Solution ultra-simple : 4 lignes de JavaScript à ajouter
});
;define("speech-synthesis-frontend/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component/-private/ember-component-manager"eaimeta@70e063a35619d71f
});
;define("speech-synthesis-frontend/components/informations-form", ["exports", "@ember/component", "@glimmer/component", "@glimmer/tracking", "@ember/object", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _tracking, _object, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!-- informations-form.hbs --}}
          <img class="trash-icon" src="assets/trash_image.png" {{on "click" this.openModale}}/>
  
  <div class="informations-form">
      <h2 class="form-title">INFORMATIONS</h2>
      
      <form class="form-container" {{on "submit" this.submitForm}}>
          <div class="input-group">
              <input 
                  type="text" 
                  class="form-input" 
                  placeholder="Nom"
                  value={{this.lastName}}
                  {{on "input" this.updateLastName}}
              >
          </div>
          
          <div class="input-group">
              <input 
                  type="text" 
                  class="form-input" 
                  placeholder="Prénom"
                  value={{this.firstName}}
                  {{on "input" this.updateFirstName}}
              >
          </div>
          
          <div class="input-group">
              <input 
                  type="email" 
                  class="form-input" 
                  placeholder="Adresse mail"
                  value={{this.mail}}
                  {{on "input" this.updateMail}}
              >
          </div>
          
          <div class="input-group">
              <input 
                  type="text" 
                  class="form-input date-input" 
                  placeholder="Date de naissance (JJ/MM/AAAA)"
                  maxlength="10"
                  value={{this.dob}}
                  {{on "input" this.updateDob}}
                  {{on "blur" this.validateDob}}
                  {{on "keypress" this.handleKeyPress}}
              >
          </div>
          
          <button type="submit" class="submit-button">
              {{#if this.aiAgents.isLoading}}
                  <div class="loading-spinner">
                      <div class="spinner"></div>
                  </div>           
                   {{else}}
                  Obtenir le résumé
              {{/if}}
          </button>
      </form>
      
  </div>
      <script>
            document.querySelector('.date-input').addEventListener('input', function(e) {
              let value = e.target.value.replace(/\D/g, ''); // Supprimer tout ce qui n'est pas un chiffre
              
              // Limiter à 8 chiffres maximum
              if (value.length > 8) {
                  value = value.substring(0, 8);
              }
              
              // Ajouter les barres obliques automatiquement
              if (value.length >= 2) {
                  value = value.substring(0, 2) + '/' + value.substring(2);
              }
              if (value.length >= 5) {
                  value = value.substring(0, 5) + '/' + value.substring(5);
              }
              
              e.target.value = value;
          });
  
          // Validation simple de la date
          document.querySelector('.date-input').addEventListener('blur', function(e) {
              const dateValue = e.target.value;
              const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
              
              if (dateValue && !dateRegex.test(dateValue)) {
                  e.target.style.borderColor = '#ff4444';
                  e.target.style.boxShadow = '0 2px 10px rgba(255, 68, 68, 0.2)';
              } else {
                  e.target.style.borderColor = '';
                  e.target.style.boxShadow = '';
              }
          });
  
          // Permettre seulement les chiffres et les barres obliques
          document.querySelector('.date-input').addEventListener('keypress', function(e) {
              const char = String.fromCharCode(e.which);
              if (!/[\d\/]/.test(char)) {
                  e.preventDefault();
              }
          });
      </script>
  */
  {
    "id": "EurFv32k",
    "block": "[[[1,\"        \"],[11,\"img\"],[24,0,\"trash-icon\"],[24,\"src\",\"assets/trash_image.png\"],[4,[38,1],[\"click\",[30,0,[\"openModale\"]]],null],[12],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"informations-form\"],[12],[1,\"\\n    \"],[10,\"h2\"],[14,0,\"form-title\"],[12],[1,\"INFORMATIONS\"],[13],[1,\"\\n    \\n    \"],[11,\"form\"],[24,0,\"form-container\"],[4,[38,1],[\"submit\",[30,0,[\"submitForm\"]]],null],[12],[1,\"\\n        \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-input\"],[24,\"placeholder\",\"Nom\"],[16,2,[30,0,[\"lastName\"]]],[24,4,\"text\"],[4,[38,1],[\"input\",[30,0,[\"updateLastName\"]]],null],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n        \\n        \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-input\"],[24,\"placeholder\",\"Prénom\"],[16,2,[30,0,[\"firstName\"]]],[24,4,\"text\"],[4,[38,1],[\"input\",[30,0,[\"updateFirstName\"]]],null],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n        \\n        \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-input\"],[24,\"placeholder\",\"Adresse mail\"],[16,2,[30,0,[\"mail\"]]],[24,4,\"email\"],[4,[38,1],[\"input\",[30,0,[\"updateMail\"]]],null],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n        \\n        \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-input date-input\"],[24,\"placeholder\",\"Date de naissance (JJ/MM/AAAA)\"],[24,\"maxlength\",\"10\"],[16,2,[30,0,[\"dob\"]]],[24,4,\"text\"],[4,[38,1],[\"input\",[30,0,[\"updateDob\"]]],null],[4,[38,1],[\"blur\",[30,0,[\"validateDob\"]]],null],[4,[38,1],[\"keypress\",[30,0,[\"handleKeyPress\"]]],null],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n        \\n        \"],[10,\"button\"],[14,0,\"submit-button\"],[14,4,\"submit\"],[12],[1,\"\\n\"],[41,[30,0,[\"aiAgents\",\"isLoading\"]],[[[1,\"                \"],[10,0],[14,0,\"loading-spinner\"],[12],[1,\"\\n                    \"],[10,0],[14,0,\"spinner\"],[12],[13],[1,\"\\n                \"],[13],[1,\"           \\n\"]],[]],[[[1,\"                Obtenir le résumé\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \\n\"],[13],[1,\"\\n    \"],[10,\"script\"],[12],[1,\"\\n          document.querySelector('.date-input').addEventListener('input', function(e) {\\n            let value = e.target.value.replace(/\\\\D/g, ''); // Supprimer tout ce qui n'est pas un chiffre\\n            \\n            // Limiter à 8 chiffres maximum\\n            if (value.length > 8) {\\n                value = value.substring(0, 8);\\n            }\\n            \\n            // Ajouter les barres obliques automatiquement\\n            if (value.length >= 2) {\\n                value = value.substring(0, 2) + '/' + value.substring(2);\\n            }\\n            if (value.length >= 5) {\\n                value = value.substring(0, 5) + '/' + value.substring(5);\\n            }\\n            \\n            e.target.value = value;\\n        });\\n\\n        // Validation simple de la date\\n        document.querySelector('.date-input').addEventListener('blur', function(e) {\\n            const dateValue = e.target.value;\\n            const dateRegex = /^(\\\\d{2})\\\\/(\\\\d{2})\\\\/(\\\\d{4})$/;\\n            \\n            if (dateValue && !dateRegex.test(dateValue)) {\\n                e.target.style.borderColor = '#ff4444';\\n                e.target.style.boxShadow = '0 2px 10px rgba(255, 68, 68, 0.2)';\\n            } else {\\n                e.target.style.borderColor = '';\\n                e.target.style.boxShadow = '';\\n            }\\n        });\\n\\n        // Permettre seulement les chiffres et les barres obliques\\n        document.querySelector('.date-input').addEventListener('keypress', function(e) {\\n            const char = String.fromCharCode(e.which);\\n            if (!/[\\\\d\\\\/]/.test(char)) {\\n                e.preventDefault();\\n            }\\n        });\\n    \"],[13]],[],false,[\"img\",\"on\",\"div\",\"h2\",\"form\",\"input\",\"button\",\"if\",\"script\"]]",
    "moduleName": "speech-synthesis-frontend/components/informations-form.hbs",
    "isStrictMode": false
  });
  // informations-form.js
  let InformationsForm = _exports.default = (_class = class InformationsForm extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "firstName", _descriptor, this);
      _initializerDefineProperty(this, "lastName", _descriptor2, this);
      _initializerDefineProperty(this, "mail", _descriptor3, this);
      _initializerDefineProperty(this, "dob", _descriptor4, this);
      _initializerDefineProperty(this, "formError", _descriptor5, this);
      _initializerDefineProperty(this, "router", _descriptor6, this);
      _initializerDefineProperty(this, "aiAgents", _descriptor7, this);
      _initializerDefineProperty(this, "modal", _descriptor8, this);
    }
    updateFirstName(event) {
      this.firstName = event.target.value;
    }
    updateLastName(event) {
      this.lastName = event.target.value;
    }
    updateMail(event) {
      this.mail = event.target.value;
    }
    updateDob(event) {
      let value = event.target.value.replace(/\D/g, ''); // Supprimer tout ce qui n'est pas un chiffre

      // Limiter à 8 chiffres maximum
      if (value.length > 8) {
        value = value.substring(0, 8);
      }

      // Ajouter les barres obliques automatiquement
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
      if (value.length >= 5) {
        value = value.substring(0, 5) + '/' + value.substring(5);
      }
      this.dob = value;
    }
    get shouldRegisterCitizen() {
      return this.firstName.length > 0 || this.lastName.length > 0 || this.mail.length > 0 || this.firstName.dob > 0;
    }
    validateDob(event) {
      const dateValue = event.target.value;
      const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      if (dateValue && !dateRegex.test(dateValue)) {
        event.target.style.borderColor = '#ff4444';
        event.target.style.boxShadow = '0 2px 10px rgba(255, 68, 68, 0.2)';
      } else {
        event.target.style.borderColor = '';
        event.target.style.boxShadow = '';
      }
    }
    handleKeyPress(event) {
      const char = String.fromCharCode(event.which);
      if (!/[\d\/]/.test(char)) {
        event.preventDefault();
      }
    }
    async submitForm(event) {
      event.preventDefault();
      if (this.aiAgents.isLoading) {
        return;
      }
      if (this.shouldRegisterCitizen) {
        const synthesisId = this.aiAgents.id; // Assumant que vous avez cette propriété
        const [day, month, year] = this.dob.split('/');
        const isoDate = `${year}-${month?.padStart(2, '0')}-${day?.padStart(2, '0')}`;
        const response = await fetch(`https://speech-synthesis-backend-production.up.railway.app/synthesis/${synthesisId}/citizen`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            citizen_firstname: this.firstName,
            citizen_lastname: this.lastName,
            citizen_email: this.mail,
            citizen_dob: isoDate
          })
        });
        if (response.status !== 200) {
          this.formError = true;
          console.log('ERREUR FORM');
        }
        /// RESET App
      }
      this.router.transitionTo('synthese', {
        queryParams: {
          id: this.aiAgents.id
        }
      });
    }
    openModale() {
      this.modal.open("Supprimer la synthèse ?", "Etes vous sure de vouloir supprimer cet enregistrement ? Cette action est irréversible.", "delete");
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "firstName", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "lastName", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "mail", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "dob", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "formError", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "aiAgents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "modal", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "updateFirstName", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateFirstName"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateLastName", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateLastName"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateMail", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateMail"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateDob", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateDob"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "validateDob", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "validateDob"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleKeyPress", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleKeyPress"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "submitForm", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "submitForm"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "openModale", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "openModale"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, InformationsForm);
});
;define("speech-synthesis-frontend/components/modal-dialog", ["exports", "@ember/component", "@glimmer/component", "@ember/service", "@ember/object", "@ember/template-factory"], function (_exports, _component, _component2, _service, _object, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/service",0,"@ember/object",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.modal.isOpen}}
    <div class="modal-backdrop">
      <div class="modal">
  
          <div class="modal-title">
              <p>{{this.modal.title}}</p>
          </div>
              <div class="modal-content">
              <p>{{this.modal.content}}</p>
          </div>
                  <div class="modal-button">
  
              {{#if (eq this.modal.type "delete")}}
              <button {{on "click" this.deleteSynthese}}>
                  Supprimer
              </button>
              <button {{on "click" this.closeModal}}>
                  Annuler
              </button>
  
              {{else}}
              <button {{on "click" this.deleteSynthese}}>
                  Nouveau dialogue
              </button>
              <button {{on "click" this.closeModal}}>
                  Annuler
              </button>
  
              {{/if}}
          </div>
      </div>
    </div>
  {{/if}}
  
  */
  {
    "id": "CR7haydi",
    "block": "[[[41,[30,0,[\"modal\",\"isOpen\"]],[[[1,\"  \"],[10,0],[14,0,\"modal-backdrop\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"modal\"],[12],[1,\"\\n\\n        \"],[10,0],[14,0,\"modal-title\"],[12],[1,\"\\n            \"],[10,2],[12],[1,[30,0,[\"modal\",\"title\"]]],[13],[1,\"\\n        \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"modal-content\"],[12],[1,\"\\n            \"],[10,2],[12],[1,[30,0,[\"modal\",\"content\"]]],[13],[1,\"\\n        \"],[13],[1,\"\\n                \"],[10,0],[14,0,\"modal-button\"],[12],[1,\"\\n\\n\"],[41,[28,[37,3],[[30,0,[\"modal\",\"type\"]],\"delete\"],null],[[[1,\"            \"],[11,\"button\"],[4,[38,5],[\"click\",[30,0,[\"deleteSynthese\"]]],null],[12],[1,\"\\n                Supprimer\\n            \"],[13],[1,\"\\n            \"],[11,\"button\"],[4,[38,5],[\"click\",[30,0,[\"closeModal\"]]],null],[12],[1,\"\\n                Annuler\\n            \"],[13],[1,\"\\n\\n\"]],[]],[[[1,\"            \"],[11,\"button\"],[4,[38,5],[\"click\",[30,0,[\"deleteSynthese\"]]],null],[12],[1,\"\\n                Nouveau dialogue\\n            \"],[13],[1,\"\\n            \"],[11,\"button\"],[4,[38,5],[\"click\",[30,0,[\"closeModal\"]]],null],[12],[1,\"\\n                Annuler\\n            \"],[13],[1,\"\\n\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"div\",\"p\",\"eq\",\"button\",\"on\"]]",
    "moduleName": "speech-synthesis-frontend/components/modal-dialog.hbs",
    "isStrictMode": false
  });
  let ModalDialog = _exports.default = (_class = class ModalDialog extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "modal", _descriptor, this);
      _initializerDefineProperty(this, "aiAgents", _descriptor2, this);
      _initializerDefineProperty(this, "audioRecorder", _descriptor3, this);
      _initializerDefineProperty(this, "router", _descriptor4, this);
    }
    deleteSynthese() {
      this.aiAgents.reset();
      this.audioRecorder.reset();
      this.modal.close();
      window.location.href = '/record';
    }
    closeModal() {
      this.modal.close();
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "modal", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "aiAgents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "audioRecorder", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "deleteSynthese", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "deleteSynthese"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "closeModal", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "closeModal"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ModalDialog);
});
;define("speech-synthesis-frontend/components/recording-button", ["exports", "@ember/component", "@glimmer/component", "@glimmer/tracking", "@ember/object", "@ember/service", "@ember/template-factory"], function (_exports, _component, _component2, _tracking, _object, _service, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    
  {{#if (eq this.state "start")}}
    <button class="big-round-button" aria-label="Start" type="button" {{on "click" this.onClick}}>
      <img src="assets/mini-arrow-start-svgrepo-com-cropped.svg"/>
    </button>
  {{/if}}
  
  {{#if (eq this.state "pause")}}
    <button class="big-round-button-pause" aria-label="Pause" type="button" {{on "click" this.onClick}}>
      <img src="assets/211871_pause_icon.svg"/>
    </button>
  {{/if}}
  
  {{#if (eq this.state "resume")}}
    <button class="big-round-button-resume" aria-label="Resume" type="button" {{on "click" this.onClick}}>
      <img src="assets/mini-arrow-start-svgrepo-com-cropped.svg"/>
    </button>
  {{/if}}
  
  */
  {
    "id": "+V3mU4yP",
    "block": "[[[1,\"\\n\"],[41,[28,[37,1],[[30,0,[\"state\"]],\"start\"],null],[[[1,\"  \"],[11,\"button\"],[24,0,\"big-round-button\"],[24,\"aria-label\",\"Start\"],[24,4,\"button\"],[4,[38,3],[\"click\",[30,0,[\"onClick\"]]],null],[12],[1,\"\\n    \"],[10,\"img\"],[14,\"src\",\"assets/mini-arrow-start-svgrepo-com-cropped.svg\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,1],[[30,0,[\"state\"]],\"pause\"],null],[[[1,\"  \"],[11,\"button\"],[24,0,\"big-round-button-pause\"],[24,\"aria-label\",\"Pause\"],[24,4,\"button\"],[4,[38,3],[\"click\",[30,0,[\"onClick\"]]],null],[12],[1,\"\\n    \"],[10,\"img\"],[14,\"src\",\"assets/211871_pause_icon.svg\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,1],[[30,0,[\"state\"]],\"resume\"],null],[[[1,\"  \"],[11,\"button\"],[24,0,\"big-round-button-resume\"],[24,\"aria-label\",\"Resume\"],[24,4,\"button\"],[4,[38,3],[\"click\",[30,0,[\"onClick\"]]],null],[12],[1,\"\\n    \"],[10,\"img\"],[14,\"src\",\"assets/mini-arrow-start-svgrepo-com-cropped.svg\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"eq\",\"button\",\"on\",\"img\"]]",
    "moduleName": "speech-synthesis-frontend/components/recording-button.hbs",
    "isStrictMode": false
  });
  let RecordingButton = _exports.default = (_class = class RecordingButton extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "state", _descriptor, this);
      _initializerDefineProperty(this, "audioRecorder", _descriptor2, this);
    }
    async onClick() {
      this.args.onClick();
      switch (this.state) {
        case 'start':
          await this.audioRecorder.startStreaming();
          this.state = 'pause';
          break;
        case 'pause':
          await this.audioRecorder.stopStreaming();
          this.state = 'resume';
          break;
        case 'resume':
          await this.audioRecorder.startStreaming();
          this.state = 'pause';
          break;
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "state", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'start';
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "audioRecorder", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "onClick", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, RecordingButton);
});
;define("speech-synthesis-frontend/components/voice-recorder", ["exports", "@ember/component", "@glimmer/component", "@ember/service", "@glimmer/tracking", "@ember/object", "@ember/template-factory"], function (_exports, _component, _component2, _service, _tracking, _object, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@ember/service",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/template-factory",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
                {{#if (eq this.state "resume")}}
          <img class="trash-icon" src="assets/trash_image.png"/ {{on "click" this.openModale}}>
  
      {{/if}}
  
  
    <div class="center-block">
        <div class="top-text">
       <h1>{{this.formattedTime}} </h1>
      </div>
  
      <div class="big-button" type="button" >
          <RecordingButton
              @onClick = {{this.onClick}}
  />
      </div>
          
  
              {{#if (eq this.state "resume")}}
               <div class="bottom-button">
                  <button class="getsynthese" type="button" {{on "click" this.getSynthese}}>
                      Cliquer pour obtenir <br/>la synthèse
                  </button>
              </div>
  
  
  
  
              {{else}}
                 
              <div class="bottom-text">
                  <div class="end-content">
  
                      {{#if (eq this.state "start")}}
                          Synthétiser la parole citoyenne par IA 
                      {{/if}}
  
                      {{#if (eq this.state "pause")}}
                      {{ this.recentTranscription}}
                      {{/if}}
  
  
                  </div>
              </div>
  
              {{/if}}
  
  
  
  
    </div>
  {{!-- 
  
  
  
  <button type="button" {{on "click" this.stopStreaming}}>
      Stop
  </button>
  
  
  {{ this.audioRecorder.transcription}}
  
  {{#if this.isActiveTranscription}}
  
  <button type="button" {{on "click" this.getSynthese}}>
      Cliquer pour obtenir la synthèse
  </button>
  
  {{/if}}
  
  
  <h1> {{this.aiAgents.isLoading}}</h1>
  
  {{ this.aiAgents.error}}
  {{ this.aiAgents.dialogueStructure}}
  {{ this.aiAgents.synthese}}
  {{ this.aiAgents.originalText}} --}}
  */
  {
    "id": "xLcLO6sQ",
    "block": "[[[41,[28,[37,1],[[30,0,[\"state\"]],\"resume\"],null],[[[1,\"        \"],[11,\"img\"],[24,0,\"trash-icon\"],[24,\"src\",\"assets/trash_image.png\"],[4,[38,3],[\"click\",[30,0,[\"openModale\"]]],null],[12],[13],[1,\"\\n\\n\"]],[]],null],[1,\"\\n\\n  \"],[10,0],[14,0,\"center-block\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"top-text\"],[12],[1,\"\\n     \"],[10,\"h1\"],[12],[1,[30,0,[\"formattedTime\"]]],[1,\" \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"big-button\"],[14,4,\"button\"],[12],[1,\"\\n        \"],[8,[39,6],null,[[\"@onClick\"],[[30,0,[\"onClick\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n        \\n\\n\"],[41,[28,[37,1],[[30,0,[\"state\"]],\"resume\"],null],[[[1,\"             \"],[10,0],[14,0,\"bottom-button\"],[12],[1,\"\\n                \"],[11,\"button\"],[24,0,\"getsynthese\"],[24,4,\"button\"],[4,[38,3],[\"click\",[30,0,[\"getSynthese\"]]],null],[12],[1,\"\\n                    Cliquer pour obtenir \"],[10,\"br\"],[12],[13],[1,\"la synthèse\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\\n\\n\\n\\n\"]],[]],[[[1,\"               \\n            \"],[10,0],[14,0,\"bottom-text\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"end-content\"],[12],[1,\"\\n\\n\"],[41,[28,[37,1],[[30,0,[\"state\"]],\"start\"],null],[[[1,\"                        Synthétiser la parole citoyenne par IA \\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,1],[[30,0,[\"state\"]],\"pause\"],null],[[[1,\"                    \"],[1,[30,0,[\"recentTranscription\"]]],[1,\"\\n\"]],[]],null],[1,\"\\n\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\\n\"]],[]]],[1,\"\\n\\n\\n\\n  \"],[13],[1,\"\\n\"]],[],false,[\"if\",\"eq\",\"img\",\"on\",\"div\",\"h1\",\"recording-button\",\"button\",\"br\"]]",
    "moduleName": "speech-synthesis-frontend/components/voice-recorder.hbs",
    "isStrictMode": false
  });
  let VoiceRecorder = _exports.default = (_class = class VoiceRecorder extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "audioRecorder", _descriptor, this);
      _initializerDefineProperty(this, "modal", _descriptor2, this);
      _initializerDefineProperty(this, "aiAgents", _descriptor3, this);
      _initializerDefineProperty(this, "timeCounter", _descriptor4, this);
      // en secondes
      _initializerDefineProperty(this, "state", _descriptor5, this);
      _defineProperty(this, "timer", null);
    }
    get formattedTime() {
      let minutes = Math.floor(this.timeCounter / 60);
      let seconds = this.timeCounter % 60;
      return `${minutes} : ${seconds.toString().padStart(2, '0')}`;
    }
    get recentTranscription() {
      const n = 60; // Remplace 100 par le nombre de caractères que tu veux
      const fullText = this.audioRecorder.fullTranscription.join(' ');
      return fullText.slice(-n);
    }
    handleTimer() {
      if (this.state === 'start') {
        if (this.timer) return; // évite les doublons
        this.timer = setInterval(() => {
          this.timeCounter++;
        }, 1000);
      }
      if (this.state === 'pause') {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
      if (this.state === 'resume') {
        if (!this.timer) {
          this.timer = setInterval(() => {
            this.timeCounter++;
          }, 1000);
        }
      }
    }
    willDestroy() {
      super.willDestroy(...arguments);
      clearInterval(this.timer);
    }
    async startRecording() {
      await this.audioRecorder.startStreaming();
    }
    async stopStreaming() {
      await this.audioRecorder.stopStreaming();
    }
    async getSynthese() {
      this.args.onGetSynthese();
      await this.aiAgents.getSynthese(this.audioRecorder.transcription);
    }
    get isActiveTranscription() {
      return this.audioRecorder.fullTranscription.length > 0;
    }
    async onClick() {
      this.handleTimer();
      switch (this.state) {
        case 'start':
          this.state = 'pause';
          break;
        case 'pause':
          this.state = 'resume';
          break;
        case 'resume':
          this.state = 'pause';
          break;
      }

      // if(this.state ==='start'){
      // this.state = "pause"
      // }
      // if(this.state==="pause"){
      //   this.state = "resume"
      // }
    }
    openModale() {
      this.modal.open("Supprimer la synthèse ?", "Etes vous sure de vouloir supprimer cet enregistrement ? Cette action est irréversible.", "delete");
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "audioRecorder", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "modal", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "aiAgents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "timeCounter", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "state", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'start';
    }
  }), _applyDecoratedDescriptor(_class.prototype, "startRecording", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "startRecording"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stopStreaming", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "stopStreaming"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getSynthese", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "getSynthese"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onClick", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "openModale", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "openModale"), _class.prototype), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, VoiceRecorder);
});
;define("speech-synthesis-frontend/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-welcome-page/components/welcome-page"eaimeta@70e063a35619d71f
});
;define("speech-synthesis-frontend/controllers/application", ["exports", "@ember/controller", "@ember/object", "@ember/service", "@glimmer/tracking"], function (_exports, _controller, _object, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let AppController = _exports.default = (_class = class AppController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "aiAgents", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
      _initializerDefineProperty(this, "displayForm", _descriptor3, this);
    }
    onGetSynthese() {
      this.displayForm = true;
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "aiAgents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "displayForm", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "onGetSynthese", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onGetSynthese"), _class.prototype), _class);
});
;define("speech-synthesis-frontend/controllers/record", ["exports", "@ember/controller", "@ember/object", "@ember/service", "@glimmer/tracking"], function (_exports, _controller, _object, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let RecordController = _exports.default = (_class = class RecordController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "aiAgents", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
      _initializerDefineProperty(this, "displayForm", _descriptor3, this);
    }
    onGetSynthese() {
      this.displayForm = true;
      this.router.transitionTo('informations');
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "aiAgents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "displayForm", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "onGetSynthese", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onGetSynthese"), _class.prototype), _class);
});
;define("speech-synthesis-frontend/controllers/synthese", ["exports", "@ember/controller", "@ember/object", "@ember/service", "@glimmer/tracking"], function (_exports, _controller, _object, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let SyntheseController = _exports.default = (_class = class SyntheseController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "selectedType", _descriptor, this);
      _initializerDefineProperty(this, "modal", _descriptor2, this);
    }
    formatDateToFrenchString(date) {
      const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };
      return new Intl.DateTimeFormat('fr-FR', options).format(date);
    }
    get displayedMail() {
      const date = new Date(this.model.created_at);
      const formattedDate = this.formatDateToFrenchString(date);
      return `Cher Madame/Monsieur,\n\nSuite à notre entrevue du ${formattedDate}, veuillez trouver ci-joint la synthèse ainsi que la retranscription.\n------------------\nSynthèse :\n${this.model.analysis_result}\n------------------\nDialogue :\n${this.model.dialogue_structure}
        `;
    }
    get displayContent() {
      if (this.selectedType === 'Dialogue') {
        return this.model.dialogue_structure;
      }
      if (this.selectedType === 'Synthèse') {
        return this.model.analysis_result;
      }
      if (this.selectedType === 'Mail') {
        return this.displayedMail;
      }
    }
    selectType(type) {
      this.selectedType = type;
    }
    sendContent() {
      const email = this.model.citizen_email || '';
      const subject = encodeURIComponent("Synthèse par IA de l'entrevue");
      const body = encodeURIComponent(this.displayedMail);

      // Construit le lien mailto
      const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

      // Redirige vers le lien
      window.location.href = mailtoLink;
    }
    copyContent() {
      navigator.clipboard.writeText(this.displayContent).then(() => {});
    }
    openModale() {
      this.modal.open("Commencer un nouveau dialogue ?", "Cette action supprimera la synthèse courrante", "reset");
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "selectedType", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'Synthèse';
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "modal", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "selectType", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "selectType"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "sendContent", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "sendContent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "copyContent", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "copyContent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "openModale", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "openModale"), _class.prototype), _class);
});
;define("speech-synthesis-frontend/data-adapter", ["exports", "@ember-data/debug/data-adapter"], function (_exports, _dataAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dataAdapter.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/debug/data-adapter"eaimeta@70e063a35619d71f
});
;define("speech-synthesis-frontend/helpers/app-version", ["exports", "@ember/component/helper", "speech-synthesis-frontend/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _helper, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper",0,"speech-synthesis-frontend/config/environment",0,"ember-cli-app-version/utils/regexp"eaimeta@70e063a35619d71f
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;
    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }
    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }
    return match ? match[0] : version;
  }
  var _default = _exports.default = (0, _helper.helper)(appVersion);
});
;define("speech-synthesis-frontend/helpers/eq", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _helper.helper)(function eq([a, b]) {
    return a === b;
  });
});
;define("speech-synthesis-frontend/helpers/page-title", ["exports", "ember-page-title/helpers/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/helpers/page-title"eaimeta@70e063a35619d71f
});
;define("speech-synthesis-frontend/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "speech-synthesis-frontend/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-app-version/initializer-factory",0,"speech-synthesis-frontend/config/environment"eaimeta@70e063a35619d71f
  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }
  var _default = _exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define("speech-synthesis-frontend/initializers/ember-data", ["exports", "@ember-data/request-utils/deprecation-support"], function (_exports, _deprecationSupport) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember-data/request-utils/deprecation-support"eaimeta@70e063a35619d71f
  /*
    This code initializes EmberData in an Ember application.
  */
  var _default = _exports.default = {
    name: 'ember-data',
    initialize(application) {
      application.registerOptionsForType('serializer', {
        singleton: false
      });
      application.registerOptionsForType('adapter', {
        singleton: false
      });
    }
  };
});
;define("speech-synthesis-frontend/router", ["exports", "@ember/routing/router", "speech-synthesis-frontend/config/environment"], function (_exports, _router, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/router",0,"speech-synthesis-frontend/config/environment"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class Router extends _router.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "location", _environment.default.locationType);
      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }
  }
  _exports.default = Router;
  Router.map(function () {
    this.route('synthese');
    this.route('record');
    this.route('informations');
  });
});
;define("speech-synthesis-frontend/routes/application", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ApplicationRoute = _exports.default = (_class = class ApplicationRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "router", _descriptor, this);
    }
    beforeModel() {
      //         this.router.transitionTo('synthese', {
      //   queryParams: { id: 1 },
      // });

      if (window.location.href.includes("synthese")) {
        return;
      }
      this.router.transitionTo('record');
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("speech-synthesis-frontend/routes/informations", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route"eaimeta@70e063a35619d71f
  class InformationsRoute extends _route.default {}
  _exports.default = InformationsRoute;
});
;define("speech-synthesis-frontend/routes/record", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class RecordRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "queryParams", {
        refreshToken: {
          refreshModel: true // force le modèle à être rechargé
        }
      });
    }
  }
  _exports.default = RecordRoute;
});
;define("speech-synthesis-frontend/routes/synthese", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let SyntheseRoute = _exports.default = (_class = class SyntheseRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "store", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
      _defineProperty(this, "queryParams", {
        id: {
          refreshModel: true
        }
      });
    }
    async model(params) {
      try {
        const response = await fetch(`https://speech-synthesis-backend-production.up.railway.app/synthese/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          if (response.status === 404) {
            // Rediriger vers une page d'erreur ou liste des synthèses
            this.router.transitionTo('syntheses'); // ou 'error'
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const synthese = await response.json();

        // Optionnel: transformation des dates
        if (synthese.created_at) {
          synthese.created_at = new Date(synthese.created_at);
        }
        if (synthese.updated_at) {
          synthese.updated_at = new Date(synthese.updated_at);
        }
        if (synthese.citizen_dob) {
          synthese.citizen_dob = new Date(synthese.citizen_dob);
        }
        console.log(synthese);
        return synthese;
      } catch (error) {
        console.error('Erreur lors de la récupération de la synthèse:', error);
        // Optionnel: redirection vers page d'erreur
        this.router.transitionTo('error');
        throw error;
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "store", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("speech-synthesis-frontend/services/ai-agents", ["exports", "@ember/service", "@glimmer/tracking"], function (_exports, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let AiAgentsService = _exports.default = (_class = class AiAgentsService extends _service.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "isLoading", _descriptor, this);
      _initializerDefineProperty(this, "synthese", _descriptor2, this);
      _initializerDefineProperty(this, "originalText", _descriptor3, this);
      _initializerDefineProperty(this, "dialogueStructure", _descriptor4, this);
      _initializerDefineProperty(this, "error", _descriptor5, this);
      _initializerDefineProperty(this, "id", _descriptor6, this);
    }
    async getSynthese(discussionText) {
      this.isLoading = true;
      try {
        const response = await fetch('https://speech-synthesis-backend-production.up.railway.app/analyseDiscussion', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: discussionText
        });
        console.log(response);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          this.dialogueStructure = result.dialogue_structure;
          this.synthese = result.analysis_result;
          this.originalText = result.original_text;
          this.id = result.id;
        } else {
          this.error = true;
        }
        console.log(result);
        return result;
      } catch (error) {
        console.error("Erreur lors de l'analyse de la discussion:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
    reset() {
      console.log('♻️ Réinitialisation du service AiAgentsService...');
      this.isLoading = false;
      this.synthese = undefined;
      this.originalText = undefined;
      this.dialogueStructure = undefined;
      this.error = false;
      this.id = 0;
      console.log('✅ Service AiAgentsService réinitialisé');
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "isLoading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "synthese", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "originalText", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "dialogueStructure", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "error", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "id", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _class);
});
;define("speech-synthesis-frontend/services/audio-recorder", ["exports", "@ember/service", "@glimmer/tracking", "@ember/object", "assemblyai", "@deepgram/sdk"], function (_exports, _service, _tracking, _object, _assemblyai, _sdk) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3; // app/services/audio-recorder.js
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@glimmer/tracking",0,"@ember/object",0,"assemblyai",0,"@deepgram/sdk"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  //b0fba1026f514760a9362dccbb8d7fee
  //19a1774a48034202e4e7650b2c9706a393ee8f39
  let AudioRecorderService = _exports.default = (_class = class AudioRecorderService extends _service.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "isConnected", _descriptor, this);
      _initializerDefineProperty(this, "isRecording", _descriptor2, this);
      _initializerDefineProperty(this, "fullTranscription", _descriptor3, this);
      _defineProperty(this, "connection", void 0);
    }
    get transcription() {
      console.log(this.fullTranscription.join('\n'));
      return this.fullTranscription.join(' ');
    }
    get isSafari() {
      return /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
    }
    get audioConstraints() {
      return this.isSafari ? {
        // Configuration Safari plus permissive
        audio: {
          sampleRate: {
            ideal: 48000
          },
          channelCount: {
            ideal: 1
          },
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      } : {
        // Configuration Chrome plus stricte
        audio: {
          channelCount: 1,
          sampleRate: 48000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      };
    }
    getSupportedMimeTypeForDeepgram() {
      const preferredTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/wav', 'audio/ogg;codecs=opus', 'audio/mp4' // Safari fallback
      ];
      for (const type of preferredTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          console.log('✅ Format supporté:', type);
          return type;
        }
      }
      console.warn('⚠️ Aucun format préféré supporté, utilisation par défaut');
      return '';
    }
    async startStreaming() {
      const url = 'http://stream.live.vc.bbcmedia.co.uk/bbc_world_service';
      console.log(this.isSafari);
      try {
        this.error = null;

        // FIX: Vérifier/forcer une nouvelle demande de micro
        await this.ensureFreshMicrophoneAccess();
        await this.startMicrophone();
        await this.initializeWebSocketDeep();
      } catch (error) {
        this.error = error.message;
        console.error('Error starting streaming:', error);
      }
    }

    // FIX: Nouvelle méthode pour s'assurer d'avoir un accès micro frais
    async ensureFreshMicrophoneAccess() {
      try {
        if (this.stream) {
          console.log('🧹 Nettoyage ancien stream');
          this.stream.getTracks().forEach(track => track.stop());
          this.stream = null;
        }
        console.log("🎤 Demande d'accès microphone...");
        const testStream = await navigator.mediaDevices.getUserMedia(this.audioConstraints);
        // Vérifier que le stream est actif
        const audioTracks = testStream.getAudioTracks();
        if (audioTracks.length === 0 || audioTracks[0].readyState !== 'live') {
          throw new Error('Stream audio non actif');
        }
        console.log('✅ Accès microphone confirmé, track état:', audioTracks[0].readyState);

        // Fermer le stream de test
        testStream.getTracks().forEach(track => track.stop());
      } catch (error) {
        console.error('❌ Erreur accès microphone:', error);
        throw new Error("Impossible d'accéder au microphone. Veuillez autoriser l'accès.");
      }
    }
    stopStreaming() {
      console.log('🛑 Arrêt du streaming en cours...');
      try {
        // 1. Arrêter l'enregistrement MediaRecorder
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
          console.log('📱 Arrêt MediaRecorder...');
          this.mediaRecorder.stop();
          this.isRecording = false;
        }

        // 2. Arrêter et nettoyer le stream audio
        if (this.stream) {
          console.log('🎤 Fermeture du stream microphone...');
          this.stream.getTracks().forEach(track => {
            console.log(`🔇 Arrêt du track: ${track.kind}, état: ${track.readyState}`);
            track.stop();
          });
          this.stream = null;
        }

        // 3. Envoyer le message de fermeture à Deepgram
        if (this.connection && this.connection.getReadyState() === 1) {
          console.log('📤 Envoi message de fermeture à Deepgram...');
          const closeMessage = JSON.stringify({
            type: 'CloseStream'
          });
          this.connection.send(closeMessage);
        }

        // 4. Fermer la connexion Deepgram après un délai
        setTimeout(() => {
          if (this.connection) {
            console.log('🔌 Fermeture connexion Deepgram...');
            // this.connection.close();
            this.connection = null;
          }
          this.isConnected = false;
        }, 1000); // Laisser le temps à Deepgram de traiter les dernières données

        // 5. Nettoyer les données
        this.audioChunks = [];
        this.error = null;
        console.log('✅ Streaming arrêté avec succès');
      } catch (error) {
        console.error("❌ Erreur lors de l'arrêt du streaming:", error);

        // Forcer le nettoyage même en cas d'erreur
        this.isRecording = false;
        this.isConnected = false;
        this.stream = null;
        this.connection = null;
        this.audioChunks = [];
      }
    }
    async initializeWebSocketDeep() {
      try {
        //hard
        const deepgram = (0, _sdk.createClient)('49fea15aaa90ec2595d02fdf1776cbffc45764b3');
        this.connection = deepgram.listen.live({
          model: 'nova-2',
          language: 'fr',
          smart_format: true,
          interim_results: true,
          sample_rate: 48000 // FIX: Correspondre à la config micro
        });
        console.log('Deepgram client:', deepgram);
        console.log('Connection créée:', this.connection); // FIX: this.connection au lieu de connection

        // FIX: Supprimer le handler onmessage (incompatible avec le SDK)
        // this.connection.onmessage = (event) => { ... };

        // CORRECTION: Tous les event listeners AVANT l'événement Open
        this.connection.on(_sdk.LiveTranscriptionEvents.Open, () => {
          console.log('✅ Connexion Deepgram ouverte !');
          this.isConnected = true;

          // FIX: Démarrer l'enregistrement SEULEMENT quand Deepgram est prêt
          if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
            console.log('🎤 Démarrage enregistrement après ouverture connexion');
            this.mediaRecorder.start(250);
          }
        });
        this.connection.on(_sdk.LiveTranscriptionEvents.Close, () => {
          console.log('🔌 Connexion fermée');
          this.isConnected = false;
        });
        this.connection.on(_sdk.LiveTranscriptionEvents.Transcript, data => {
          console.log('📝 Données de transcription reçues:', data);

          // Vérification des données
          if (data.channel?.alternatives?.[0]?.transcript) {
            const transcript = data.channel.alternatives[0].transcript;
            if (data.is_final) {
              this.fullTranscription = [...this.fullTranscription, transcript];
            }
            console.log('✨ Transcription:', this.fullTranscription);
          } else {
            console.log('⚠️ Pas de transcription dans les données:', data);
          }
        });
        this.connection.on(_sdk.LiveTranscriptionEvents.Metadata, data => {
          console.log('📊 Métadonnées:', data);
        });
        this.connection.on(_sdk.LiveTranscriptionEvents.Error, err => {
          console.error('❌ Erreur Deepgram:', err); // FIX: console.error au lieu de console.erlogror
        });
      } catch (error) {
        console.log("❌ Erreur lors de l'initialisation:", error);
        throw error;
      }
    }
    get isSupported() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
    async startMicrophone() {
      if (!this.isSupported) {
        throw new Error('Enregistrement audio non supporté par ce navigateur');
      }
      try {
        // FIX: Nouvelle demande microphone (même si on a déjà testé)
        console.log('🎤 Initialisation stream microphone...');
        this.stream = await navigator.mediaDevices.getUserMedia(this.audioConstraints);

        // FIX: Vérifier que le stream est bien actif
        const audioTracks = this.stream.getAudioTracks();
        console.log('🔍 État du track audio:', {
          count: audioTracks.length,
          state: audioTracks[0]?.readyState,
          enabled: audioTracks[0]?.enabled
        });

        // Créer MediaRecorder
        this.mediaRecorder = new MediaRecorder(this.stream, {
          mimeType: this.getSupportedMimeTypeForDeepgram()
          // FIX: Supprimer sample_rate (invalide pour MediaRecorder)
        });
        this.audioChunks = [];
        this.isRecording = true;

        // Événements MediaRecorder
        this.mediaRecorder.ondataavailable = event => {
          console.log('debug');
          if (event.data.size > 0) {
            if (this.connection && this.connection.getReadyState() === 1) {
              // Méthode 1: Envoyer directement le Blob
              this.connection.send(event.data);
              console.log('✅ Données envoyées à Deepgram');
            } else {
              console.log('⚠️ Connexion Deepgram non prête');
              this.audioChunks.push(event.data);
            }
          }
        };
        this.mediaRecorder.onstop = () => {
          console.log('🛑 MediaRecorder stop');
        };

        // FIX: Ne pas démarrer ici, attendre l'ouverture de Deepgram
        console.log('📱 MediaRecorder configuré, en attente connexion Deepgram...');
        // this.mediaRecorder.start(250); // Déplacé dans le listener Open
      } catch (error) {
        console.error("Erreur lors du démarrage de l'enregistrement:", error);
        throw error;
      }
    }

    // FIX: Méthode utilitaire pour diagnostiquer l'état
    diagnoseAudioState() {
      console.log('🔍 Diagnostic audio:', {
        hasStream: !!this.stream,
        streamActive: this.stream?.active,
        tracksCount: this.stream?.getAudioTracks().length,
        trackState: this.stream?.getAudioTracks()[0]?.readyState,
        mediaRecorderState: this.mediaRecorder?.state,
        connectionState: this.connection?.getReadyState(),
        isConnected: this.isConnected,
        isRecording: this.isRecording
      });
    }
    reset() {
      console.log('♻️ Réinitialisation du service AudioRecorder...');
      try {
        // 1. Stopper le streaming en cours proprement
        this.stopStreaming();
      } catch (error) {
        console.warn('⚠️ Erreur pendant stopStreaming dans reset():', error);
      }

      // 2. Réinitialiser les propriétés tracked et internes
      this.isConnected = false;
      this.isRecording = false;
      this.fullTranscription = [];

      // 3. Réinitialiser les objets internes
      this.stream = null;
      this.mediaRecorder = null;
      this.audioChunks = [];
      this.error = null;

      // 4. Fermer explicitement la connexion WebSocket si encore ouverte
      if (this.connection && this.connection.getReadyState() === 1) {
        try {
          console.log('🔌 Fermeture manuelle de la connexion Deepgram...');
          this.connection.send(JSON.stringify({
            type: 'CloseStream'
          }));
          this.connection.close();
        } catch (e) {
          console.warn('⚠️ Erreur lors de la fermeture manuelle de Deepgram:', e);
        }
      }
      this.connection = null;
      console.log('✅ Service AudioRecorder réinitialisé');
    }

    //   async initializeWebSocket() {

    //     return new Promise((resolve, reject) => {

    //       this.ws = new WebSocket(  "wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=b0fba1026f514760a9362dccbb8d7fee"
    // );
    //       console.log(this.ws)

    //       // Note: WebSocket constructor in browser doesn't support headers directly
    //       // You might need to send the API key in the connection URL or as first message
    //       // For AssemblyAI, you typically send it as a header, but browser WebSocket API is limited
    //       // Consider using their JavaScript SDK or sending auth in first message

    //       this.ws.onopen = () => {
    //         console.log('WebSocket connection opened');
    //         console.log(`Connected to: ${this.apiEndpoint}`);
    //         this.isConnected = true;
    //         resolve();
    //       };

    //       this.ws.onmessage = (event) => {
    //         this.handleWebSocketMessage(event.data);
    //       };

    //       this.ws.onerror = (error) => {
    //         console.error('WebSocket Error:', error);
    //         this.error = 'WebSocket connection error';
    //         this.cleanup();
    //         reject(error);
    //       };

    //       this.ws.onclose = (event) => {
    //         console.log(`WebSocket Disconnected: Status=${event.code}, Reason=${event.reason}`);
    //         this.isConnected = false;
    //         this.cleanup();
    //       };
    //     });
    //   }

    //   handleWebSocketMessage(message) {
    //     try {
    //       const data = JSON.parse(message);
    //       const msgType = data.type;

    //       if (msgType === 'Begin') {
    //         this.sessionId = data.id;
    //         const expiresAt = data.expires_at;
    //         console.log(`Session began: ID=${this.sessionId}, ExpiresAt=${this.formatTimestamp(expiresAt)}`);
    //       } else if (msgType === 'Turn') {
    //         const transcript = data.transcript || '';
    //         const formatted = data.turn_is_formatted;

    //         if (formatted) {
    //           this.currentTranscript = transcript;
    //           console.log('Final transcript:', transcript);
    //           // Trigger any callbacks for final transcript
    //           this.onFinalTranscript?.(transcript);
    //         } else {
    //           this.currentTranscript = transcript;
    //           // Trigger any callbacks for partial transcript
    //           this.onPartialTranscript?.(transcript);
    //         }
    //       } else if (msgType === 'Termination') {
    //         const audioDuration = data.audio_duration_seconds;
    //         const sessionDuration = data.session_duration_seconds;
    //         console.log(`Session Terminated: Audio Duration=${audioDuration}s, Session Duration=${sessionDuration}s`);
    //         this.onSessionTerminated?.(data);
    //       }
    //     } catch (error) {
    //       console.error('Error handling message:', error);
    //       console.error('Message data:', message);
    //     }
    //   }

    //   async startMicrophone() {
    //     try {
    //       // Request microphone access
    //       this.audioStream = await navigator.mediaDevices.getUserMedia({
    //         audio: {
    //           sampleRate: this.SAMPLE_RATE,
    //           channelCount: this.CHANNELS,
    //           echoCancellation: true,
    //           noiseSuppression: true,
    //         },
    //       });

    //       // Create audio context for processing
    //       this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
    //         sampleRate: this.SAMPLE_RATE,
    //       });

    //       const source = this.audioContext.createMediaStreamSource(this.audioStream);

    //       // Create ScriptProcessorNode for real-time audio processing
    //       this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

    //       this.processor.onaudioprocess = (event) => {
    //         if (this.ws && this.ws.readyState === WebSocket.OPEN && this.isRecording) {
    //           const inputBuffer = event.inputBuffer;
    //           const inputData = inputBuffer.getChannelData(0);

    //           // Convert Float32Array to Int16Array (PCM 16-bit)
    //           const pcmData = this.float32ToInt16(inputData);

    //           console.log(pcmData)
    //         }
    //       };

    //       source.connect(this.processor);
    //       this.processor.connect(this.audioContext.destination);

    //       // Also set up MediaRecorder for saving audio file
    //       this.setupMediaRecorder();

    //       this.isRecording = true;
    //       console.log('Microphone stream started successfully');
    //       console.log('Speaking into microphone...');

    //     } catch (error) {
    //       console.error('Error accessing microphone:', error);
    //       this.error = 'Microphone access denied or not available';
    //       throw error;
    //     }
    //   }

    //   setupMediaRecorder() {
    //     this.recordedChunks = [];

    //     this.mediaRecorder = new MediaRecorder(this.audioStream, {
    //       mimeType: 'audio/webm;codecs=opus',
    //     });

    //     this.mediaRecorder.ondataavailable = (event) => {
    //       if (event.data.size > 0) {
    //         this.recordedChunks.push(event.data);
    //       }
    //     };

    //     this.mediaRecorder.onstop = () => {
    //       this.saveRecordedAudio();
    //     };

    //     this.mediaRecorder.start(1000); // Collect data every second
    //   }

    //   float32ToInt16(float32Array) {
    //     const int16Array = new Int16Array(float32Array.length);
    //     for (let i = 0; i < float32Array.length; i++) {
    //       const sample = Math.max(-1, Math.min(1, float32Array[i]));
    //       int16Array[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    //     }
    //     return int16Array;
    //   }

    //   saveRecordedAudio() {
    //     if (this.recordedChunks.length === 0) {
    //       console.log('No audio data recorded');
    //       return;
    //     }

    //     const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
    //     const url = URL.createObjectURL(blob);

    //     // Create download link
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = `recorded_audio_${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.webm`;
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);

    //     // Clean up
    //     URL.revokeObjectURL(url);

    //     console.log('Audio file downloaded');
    //   }

    //   cleanup() {
    //     this.isRecording = false;

    //     // Stop media recorder
    //     if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
    //       this.mediaRecorder.stop();
    //     }

    //     // Stop audio processing
    //     if (this.processor) {
    //       this.processor.disconnect();
    //       this.processor = null;
    //     }

    //     // Close audio context
    //     if (this.audioContext && this.audioContext.state !== 'closed') {
    //       this.audioContext.close();
    //       this.audioContext = null;
    //     }

    //     // Stop media stream
    //     if (this.audioStream) {
    //       this.audioStream.getTracks().forEach(track => track.stop());
    //       this.audioStream = null;
    //     }

    //     // Close WebSocket
    //     if (this.ws && [WebSocket.OPEN, WebSocket.CONNECTING].includes(this.ws.readyState)) {
    //       try {
    //         if (this.ws.readyState === WebSocket.OPEN) {
    //           const terminateMessage = { type: 'Terminate' };
    //           console.log('Sending termination message:', JSON.stringify(terminateMessage));
    //           this.ws.send(JSON.stringify(terminateMessage));
    //         }
    //         this.ws.close();
    //       } catch (error) {
    //         console.error('Error closing WebSocket:', error);
    //       }
    //       this.ws = null;
    //     }

    //     this.isConnected = false;
    //     this.currentTranscript = '';
    //     this.sessionId = null;
    //     this.recordedChunks = [];

    //     console.log('Cleanup complete');
    //   }

    //   formatTimestamp(timestamp) {
    //     return new Date(timestamp * 1000).toISOString();
    //   }

    //   // Callback methods - can be overridden or set by components
    //   onFinalTranscript = null;
    //   onPartialTranscript = null;
    //   onSessionTerminated = null;

    //   // Cleanup when service is destroyed
    //   willDestroy() {
    //     super.willDestroy();
    //     this.cleanup();
    //   }
    //   // @tracked isRecording = false;
    // @tracked isSupported = false;

    // mediaRecorder = null;
    // audioChunks = [];
    // stream = null;
    // websocket = null;

    // constructor() {
    //   super(...arguments);
    //   this.checkSupport();
    // }

    // checkSupport() {
    //   this.isSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    // }

    // async startRecording() {
    //   if (!this.isSupported) {
    //     throw new Error('Enregistrement audio non supporté par ce navigateur');
    //   }

    //   try {
    //     // Demander l'autorisation microphone
    //     this.stream = await navigator.mediaDevices.getUserMedia({
    //       audio: {
    //         channelCount: 1,
    //         sampleRate: 16000, // Optimal pour la plupart des APIs
    //         echoCancellation: true,
    //         noiseSuppression: true,
    //         autoGainControl: true
    //       }
    //     });

    //     // Créer MediaRecorder
    //     this.mediaRecorder = new MediaRecorder(this.stream, {
    //       mimeType: this.getSupportedMimeType()
    //     });

    //     this.audioChunks = [];
    //     this.isRecording = true;

    //     // Événements MediaRecorder
    //     this.mediaRecorder.ondataavailable = (event) => {
    //       if (event.data.size > 0) {
    //         this.audioChunks.push(event.data);
    //                     console.log(this.websocket)

    //         // Envoyer chunk en temps réel si WebSocket connecté
    //         if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
    //           this.sendAudioChunk(event.data);
    //         }
    //       }
    //     };

    //     this.mediaRecorder.onstop = () => {
    //           console.log('stop')

    //       this.processRecording();
    //     };
    //      await this.connectWebSocket();

    //     // Démarrer l'enregistrement avec chunks de 250ms pour temps réel
    //     this.mediaRecorder.start(250);

    //     // Optionnel : Connecter WebSocket pour transcription temps réel

    //   } catch (error) {
    //     console.error('Erreur lors du démarrage de l\'enregistrement:', error);
    //     throw error;
    //   }
    // }

    // @action
    // stopRecording() {
    //   console.log('st')
    //   if (this.mediaRecorder && this.isRecording) {
    //     this.mediaRecorder.stop();
    //     this.isRecording = false;

    //     // Arrêter le stream
    //     if (this.stream) {
    //       this.stream.getTracks().forEach(track => track.stop());
    //       this.stream = null;
    //     }

    //     // Fermer WebSocket si ouvert
    //     if (this.websocket) {
    //       this.websocket.close();
    //       this.websocket = null;
    //     }
    //   }
    // }

    // getSupportedMimeType() {
    //   const types = [
    //     'audio/webm;codecs=opus',
    //     'audio/webm',
    //     'audio/mp4',
    //     'audio/ogg;codecs=opus'
    //   ];

    //   return types.find(type => MediaRecorder.isTypeSupported(type)) || '';
    // }

    // async processRecording() {
    //   if (this.audioChunks.length === 0) return;

    //   // Créer blob audio
    //   const audioBlob = new Blob(this.audioChunks, {
    //     type: this.getSupportedMimeType()
    //   });

    //   // Convertir en ArrayBuffer pour l'API
    //   const arrayBuffer = await audioBlob.arrayBuffer();

    //   // Envoyer à l'API de transcription
    //   return this.sendToTranscriptionAPI(arrayBuffer);
    // }

    // // Méthode pour AssemblyAI (exemple)
    // async sendToTranscriptionAPI(audioData) {
    //   const ASSEMBLY_AI_API_KEY = 'your-api-key';

    //   try {
    //     // 1. Upload audio
    //     const uploadUrl = await this.uploadAudio(audioData, ASSEMBLY_AI_API_KEY);

    //     // 2. Demander transcription
    //     const transcriptId = await this.requestTranscription(uploadUrl, ASSEMBLY_AI_API_KEY);

    //     // 3. Récupérer résultat
    //     return await this.getTranscriptionResult(transcriptId, ASSEMBLY_AI_API_KEY);

    //   } catch (error) {
    //     console.error('Erreur API de transcription:', error);
    //     throw error;
    //   }
    // }

    // async uploadAudio(audioData, apiKey) {
    //   const response = await fetch('https://api.assemblyai.com/v2/upload', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': apiKey,
    //       'Content-Type': 'application/octet-stream'
    //     },
    //     body: audioData
    //   });

    //   const data = await response.json();
    //   return data.upload_url;
    // }

    // async requestTranscription(audioUrl, apiKey) {
    //   const response = await fetch('https://api.assemblyai.com/v2/transcript', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': apiKey,
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       audio_url: audioUrl,
    //       language_code: 'fr' // Français
    //     })
    //   });

    //   const data = await response.json();
    //   return data.id;
    // }

    // async getTranscriptionResult(transcriptId, apiKey) {
    //   const maxAttempts = 30; // 30 secondes max
    //   let attempts = 0;

    //   while (attempts < maxAttempts) {
    //     const response = await fetch(
    //       `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
    //       {
    //         headers: { 'Authorization': apiKey }
    //       }
    //     );

    //     const data = await response.json();

    //     if (data.status === 'completed') {
    //       return data.text;
    //     } else if (data.status === 'error') {
    //       throw new Error('Erreur de transcription');
    //     }

    //     // Attendre 1 seconde avant de réessayer
    //     await new Promise(resolve => setTimeout(resolve, 1000));
    //     attempts++;
    //   }

    //   throw new Error('Timeout de transcription');
    // }

    // // WebSocket pour temps réel (AssemblyAI)
    // async connectWebSocket() {
    //   const ASSEMBLY_AI_API_KEY = 'b0fba1026f514760a9362dccbb8d7fee';

    //   this.websocket = new WebSocket(
    //     `wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&token=${ASSEMBLY_AI_API_KEY}`
    //   );

    //   this.websocket.onopen = () => {
    //     console.log('WebSocket connecté');
    //   };

    //   this.websocket.onmessage = (event) => {
    //     const data = JSON.parse(event.data);
    //     console.log(data)
    //     if (data.message_type === 'FinalTranscript') {
    //       // Émettre événement avec texte transcrit
    //       this.onTranscriptionReceived?.(data.text);
    //     }
    //   };

    //   this.websocket.onerror = (error) => {
    //     console.error('Erreur WebSocket:', error);
    //   };
    // }

    // sendAudioChunk(audioChunk) {
    //   if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
    //     // Convertir en base64 pour AssemblyAI
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       const base64Audio = reader.result.split(',')[1];
    //       this.websocket.send(JSON.stringify({
    //         audio_data: base64Audio
    //       }));

    //     };
    //     reader.readAsDataURL(audioChunk);
    //   }
    // }

    // // Callback pour recevoir transcriptions temps réel
    // onTranscriptionReceived = null;
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "isConnected", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "isRecording", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "fullTranscription", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _applyDecoratedDescriptor(_class.prototype, "startStreaming", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "startStreaming"), _class.prototype), _class);
});
;define("speech-synthesis-frontend/services/modal", ["exports", "@ember/service", "@glimmer/tracking"], function (_exports, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ModalService = _exports.default = (_class = class ModalService extends _service.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "isOpen", _descriptor, this);
      _initializerDefineProperty(this, "title", _descriptor2, this);
      _initializerDefineProperty(this, "content", _descriptor3, this);
      _initializerDefineProperty(this, "type", _descriptor4, this);
    }
    open(title, content, type) {
      this.title = title;
      this.content = content;
      this.type = type;
      this.isOpen = true;
    }
    close() {
      this.isOpen = false;
      this.title = '';
      this.content = '';
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "isOpen", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "title", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'title';
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "content", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'content';
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "type", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "";
    }
  }), _class);
});
;define("speech-synthesis-frontend/services/page-title", ["exports", "ember-page-title/services/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/services/page-title"eaimeta@70e063a35619d71f
});
;define("speech-synthesis-frontend/services/store", ["exports", "@ember/debug", "ember-data/store"], function (_exports, _debug, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"ember-data/store"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the store service. Use `export { default } from 'ember-data/store';` in app/services/store.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;define("speech-synthesis-frontend/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!-- app/templates/application.hbs --}}
  <div class="app-container">
    {{!-- Header --}}
    <header class="app-header">
      <h1>5 MINUTES POUR MONTPELLIER      
  </h1>
      {{#if this.aiAgents.error}}
        <h1>Erreur</h1>
      {{/if}}
    </header>
  
    {{!-- Contenu principal --}}
    <main class="app-main">
        <ModalDialog/>
  
      <div class="content">
        {{outlet}}
      </div>
    </main>
  
    {{!-- Footer --}}
    <footer class="app-footer">
      <p>&copy; 2025 Johan</p>
    </footer>
  </div>
  
  
  
  
  */
  {
    "id": "wivDH1t1",
    "block": "[[[10,0],[14,0,\"app-container\"],[12],[1,\"\\n\"],[1,\"  \"],[10,\"header\"],[14,0,\"app-header\"],[12],[1,\"\\n    \"],[10,\"h1\"],[12],[1,\"5 MINUTES POUR MONTPELLIER      \\n\"],[13],[1,\"\\n\"],[41,[30,0,[\"aiAgents\",\"error\"]],[[[1,\"      \"],[10,\"h1\"],[12],[1,\"Erreur\"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,\"main\"],[14,0,\"app-main\"],[12],[1,\"\\n      \"],[8,[39,5],null,null,null],[1,\"\\n\\n    \"],[10,0],[14,0,\"content\"],[12],[1,\"\\n      \"],[46,[28,[37,7],null,null],null,null,null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,\"footer\"],[14,0,\"app-footer\"],[12],[1,\"\\n    \"],[10,2],[12],[1,\"© 2025 Johan\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\\n\\n\"]],[],false,[\"div\",\"header\",\"h1\",\"if\",\"main\",\"modal-dialog\",\"component\",\"-outlet\",\"footer\",\"p\"]]",
    "moduleName": "speech-synthesis-frontend/templates/application.hbs",
    "isStrictMode": false
  });
});
;define("speech-synthesis-frontend/templates/informations", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Informations"}}
  <InformationsForm/>
  */
  {
    "id": "Xo6lmxey",
    "block": "[[[1,[28,[35,0],[\"Informations\"],null]],[1,\"\\n\"],[8,[39,1],null,null,null]],[],false,[\"page-title\",\"informations-form\"]]",
    "moduleName": "speech-synthesis-frontend/templates/informations.hbs",
    "isStrictMode": false
  });
});
;define("speech-synthesis-frontend/templates/record", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Record"}}
        <VoiceRecorder
            @onGetSynthese={{this.onGetSynthese}} 
        />
  
  */
  {
    "id": "DcY89lTC",
    "block": "[[[1,[28,[35,0],[\"Record\"],null]],[1,\"\\n      \"],[8,[39,1],null,[[\"@onGetSynthese\"],[[30,0,[\"onGetSynthese\"]]]],null],[1,\"\\n\"]],[],false,[\"page-title\",\"voice-recorder\"]]",
    "moduleName": "speech-synthesis-frontend/templates/record.hbs",
    "isStrictMode": false
  });
});
;define("speech-synthesis-frontend/templates/synthese", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Synthese"}}
  
    <img class="refresh-icon" src="assets/refresh_image.png"/ {{on "click" this.openModale}} >
  
    <div class="center-block-resume">
        <div class="top-text-resume">
            <h2 class="title">RÉSUMÉ</h2>
      </div>
  
      <div class = "content-selector-resume">
  
  
  <div class="wrapper-resume">
  
  
            <div class="type-selector-resume">
  
          <button 
        class="type-btn {{if (eq this.selectedType 'Dialogue') 'active' 'inactive'}} Dialogue" type="button" {{on "click" (fn this.selectType "Dialogue")}}
      >
        Dialogue
  
            </button>
  
      <button 
        class="type-btn {{if (eq this.selectedType 'Synthèse') 'active' 'inactive'}} Synthèse" type="button" {{on "click" (fn this.selectType "Synthèse")}}
      >
        Synthèse
      </button>
      <button 
        class="type-btn {{if (eq this.selectedType 'Mail') 'active' 'inactive'}} Mail" type="button" {{on "click" (fn this.selectType "Mail")}}
      >
        Mail
      </button>
    </div>
  
  
  
      <div class="content-are-resume">
      <pre class="content-text-resume">{{this.displayContent}}</pre>
    </div>
  
    <div class="action-buttons-resume">
      <button class="action-btn copy-btn" type="button" {{on "click" this.copyContent}}>
                   <img class="small-icon" src="assets/copy_image.png"/>
  
         Copier
      </button>
      <button class="action-btn send-btn" type="button" {{on "click" this.sendContent}}>
             <img class="small-icon" src="assets/send_image.png"/>
  
         Envoyer
      </button>
    </div>
  
  
  </div>
  
  
  
  
  
      </div>
  
  
    </div>
  
  
  
  
  
  {{!-- <div class="content-selector">
    <div class="header">
      <h2 class="title">RÉSUMÉ</h2>
    </div>
  
    <div class="type-selector-wrapper">
  
  
    <div class="type-selector">
  
          <button 
        class="type-btn {{if (eq this.selectedType 'texte') 'active' 'inactive'}}"
        {{on "click" (fn this.selectType "Dialogue")}}
      >
        Dialogue
  
            </button>
  
      <button 
        class="type-btn {{if (eq this.selectedType 'texte') 'active' 'inactive'}}"
        {{on "click" (fn this.selectType "Synthèse")}}
      >
        Synthèse
      </button>
      <button 
        class="type-btn {{if (eq this.selectedType 'mail') 'active' 'inactive'}}"
        {{on "click" (fn this.selectType "Mail")}}
      >
        Mail
      </button>
    </div>
  
    <div class="content-area">
      <pre class="content-text">{{this.displayContent}}</pre>
    </div>
  
    <div class="action-buttons">
      <button class="action-btn copy-btn" {{on "click" this.copyContent}}>
        📋 Copier
      </button>
      <button class="action-btn send-btn" {{on "click" this.sendContent}}>
        📤 Envoyer
      </button>
    </div>
      </div>
    
  </div> --}}
  */
  {
    "id": "0QeXBIrr",
    "block": "[[[1,[28,[35,0],[\"Synthese\"],null]],[1,\"\\n\\n  \"],[11,\"img\"],[24,0,\"refresh-icon\"],[24,\"src\",\"assets/refresh_image.png\"],[4,[38,2],[\"click\",[30,0,[\"openModale\"]]],null],[12],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"center-block-resume\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"top-text-resume\"],[12],[1,\"\\n          \"],[10,\"h2\"],[14,0,\"title\"],[12],[1,\"RÉSUMÉ\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"content-selector-resume\"],[12],[1,\"\\n\\n\\n\"],[10,0],[14,0,\"wrapper-resume\"],[12],[1,\"\\n\\n\\n          \"],[10,0],[14,0,\"type-selector-resume\"],[12],[1,\"\\n\\n        \"],[11,\"button\"],[16,0,[29,[\"type-btn \",[52,[28,[37,7],[[30,0,[\"selectedType\"]],\"Dialogue\"],null],\"active\",\"inactive\"],\" Dialogue\"]]],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,8],[[30,0,[\"selectType\"]],\"Dialogue\"],null]],null],[12],[1,\"\\n      Dialogue\\n\\n          \"],[13],[1,\"\\n\\n    \"],[11,\"button\"],[16,0,[29,[\"type-btn \",[52,[28,[37,7],[[30,0,[\"selectedType\"]],\"Synthèse\"],null],\"active\",\"inactive\"],\" Synthèse\"]]],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,8],[[30,0,[\"selectType\"]],\"Synthèse\"],null]],null],[12],[1,\"\\n      Synthèse\\n    \"],[13],[1,\"\\n    \"],[11,\"button\"],[16,0,[29,[\"type-btn \",[52,[28,[37,7],[[30,0,[\"selectedType\"]],\"Mail\"],null],\"active\",\"inactive\"],\" Mail\"]]],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,8],[[30,0,[\"selectType\"]],\"Mail\"],null]],null],[12],[1,\"\\n      Mail\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\\n\\n    \"],[10,0],[14,0,\"content-are-resume\"],[12],[1,\"\\n    \"],[10,\"pre\"],[14,0,\"content-text-resume\"],[12],[1,[30,0,[\"displayContent\"]]],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"action-buttons-resume\"],[12],[1,\"\\n    \"],[11,\"button\"],[24,0,\"action-btn copy-btn\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"copyContent\"]]],null],[12],[1,\"\\n                 \"],[10,\"img\"],[14,0,\"small-icon\"],[14,\"src\",\"assets/copy_image.png\"],[12],[13],[1,\"\\n\\n       Copier\\n    \"],[13],[1,\"\\n    \"],[11,\"button\"],[24,0,\"action-btn send-btn\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"sendContent\"]]],null],[12],[1,\"\\n           \"],[10,\"img\"],[14,0,\"small-icon\"],[14,\"src\",\"assets/send_image.png\"],[12],[13],[1,\"\\n\\n       Envoyer\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\\n\"],[13],[1,\"\\n\\n\\n\\n\\n\\n    \"],[13],[1,\"\\n\\n\\n  \"],[13],[1,\"\\n\\n\\n\\n\\n\\n\"]],[],false,[\"page-title\",\"img\",\"on\",\"div\",\"h2\",\"button\",\"if\",\"eq\",\"fn\",\"pre\"]]",
    "moduleName": "speech-synthesis-frontend/templates/synthese.hbs",
    "isStrictMode": false
  });
});
;define("speech-synthesis-frontend/transforms/boolean", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.BooleanTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the BooleanTransform. Use `export { BooleanTransform as default } from '@ember-data/serializer/transform';` in app/transforms/boolean.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;define("speech-synthesis-frontend/transforms/date", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.DateTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the DateTransform. Use `export { DateTransform as default } from '@ember-data/serializer/transform';` in app/transforms/date.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;define("speech-synthesis-frontend/transforms/number", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.NumberTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the NumberTransform. Use `export { NumberTransform as default } from '@ember-data/serializer/transform';` in app/transforms/number.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;define("speech-synthesis-frontend/transforms/string", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.StringTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the StringTransform. Use `export { StringTransform as default } from '@ember-data/serializer/transform';` in app/transforms/string.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;

;define('speech-synthesis-frontend/config/environment', [], function() {
  var prefix = 'speech-synthesis-frontend';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("speech-synthesis-frontend/app")["default"].create({"name":"speech-synthesis-frontend","version":"0.0.0+6fb14a27"});
          }
        
//# sourceMappingURL=speech-synthesis-frontend.map
