'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    fingerprint: {
      exclude: ['assets/**/*']
    },
    SRI: {
      enabled: false  // Désactive SRI globalement
      // OU pour être plus spécifique :
      // exclude: ['assets/**/*']
    }
    // Add options here
  });

  return app.toTree();
};
