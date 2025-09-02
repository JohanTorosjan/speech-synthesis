'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    fingerprint: {
      exclude: ['assets/d.png','assets/trash_image.png','assets/d.png','assets/4.png']
    }
    // Add options here
  });

  return app.toTree();
};
