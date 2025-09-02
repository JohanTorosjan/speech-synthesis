'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    fingerprint: {
      enabled: true,
      // Ne pas exclure les fingerprints, mais gérer SRI différemment
      generateAssetMap: true
    },
    sri: {
      enabled: true,
      // Excluez seulement les assets qui changent fréquemment
      exclude: [
        'assets/images/**/*',
        'assets/fonts/**/*',
        '**/speech-synthesis-frontend.js'
      ]
    }
  });

  return app.toTree();
};