'use strict';

define("speech-synthesis-frontend/tests/helpers/index", ["exports", "ember-qunit"], function (_exports, _emberQunit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.setupApplicationTest = setupApplicationTest;
  _exports.setupRenderingTest = setupRenderingTest;
  _exports.setupTest = setupTest;
  0; //eaimeta@70e063a35619d71f0,"ember-qunit"eaimeta@70e063a35619d71f
  // This file exists to provide wrappers around ember-qunit's
  // test setup functions. This way, you can easily extend the setup that is
  // needed per test type.

  function setupApplicationTest(hooks, options) {
    (0, _emberQunit.setupApplicationTest)(hooks, options);

    // Additional setup for application tests can be done here.
    //
    // For example, if you need an authenticated session for each
    // application test, you could do:
    //
    // hooks.beforeEach(async function () {
    //   await authenticateSession(); // ember-simple-auth
    // });
    //
    // This is also a good place to call test setup functions coming
    // from other addons:
    //
    // setupIntl(hooks, 'en-us'); // ember-intl
    // setupMirage(hooks); // ember-cli-mirage
  }
  function setupRenderingTest(hooks, options) {
    (0, _emberQunit.setupRenderingTest)(hooks, options);

    // Additional setup for rendering tests can be done here.
  }
  function setupTest(hooks, options) {
    (0, _emberQunit.setupTest)(hooks, options);

    // Additional setup for unit tests can be done here.
  }
});
define("speech-synthesis-frontend/tests/integration/components/informations-form-test", ["qunit", "speech-synthesis-frontend/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"speech-synthesis-frontend/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | informations-form', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <InformationsForm />
      */
      {
        "id": "11QpUawj",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"informations-form\"]]",
        "moduleName": "/Users/johantorosjan/Desktop/jo-dev/MR/dev/speech-synthesis-frontend/speech-synthesis-frontend/tests/integration/components/informations-form-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <InformationsForm>
              template block text
            </InformationsForm>
          
      */
      {
        "id": "vwO2f2zq",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"informations-form\"]]",
        "moduleName": "/Users/johantorosjan/Desktop/jo-dev/MR/dev/speech-synthesis-frontend/speech-synthesis-frontend/tests/integration/components/informations-form-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("speech-synthesis-frontend/tests/integration/components/modal-dialog-test", ["qunit", "speech-synthesis-frontend/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"speech-synthesis-frontend/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | modal-dialog', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <ModalDialog />
      */
      {
        "id": "Ah/48G0j",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"modal-dialog\"]]",
        "moduleName": "/Users/johantorosjan/Desktop/jo-dev/MR/dev/speech-synthesis-frontend/speech-synthesis-frontend/tests/integration/components/modal-dialog-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <ModalDialog>
              template block text
            </ModalDialog>
          
      */
      {
        "id": "9QdELEkS",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"modal-dialog\"]]",
        "moduleName": "/Users/johantorosjan/Desktop/jo-dev/MR/dev/speech-synthesis-frontend/speech-synthesis-frontend/tests/integration/components/modal-dialog-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("speech-synthesis-frontend/tests/integration/components/recording-button-test", ["qunit", "speech-synthesis-frontend/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"speech-synthesis-frontend/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | recording-button', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <RecordingButton />
      */
      {
        "id": "FHTBOGBe",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"recording-button\"]]",
        "moduleName": "/Users/johantorosjan/Desktop/jo-dev/MR/dev/speech-synthesis-frontend/speech-synthesis-frontend/tests/integration/components/recording-button-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <RecordingButton>
              template block text
            </RecordingButton>
          
      */
      {
        "id": "xOdphbv1",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"recording-button\"]]",
        "moduleName": "/Users/johantorosjan/Desktop/jo-dev/MR/dev/speech-synthesis-frontend/speech-synthesis-frontend/tests/integration/components/recording-button-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("speech-synthesis-frontend/tests/integration/components/voice-recorder-test", ["qunit", "speech-synthesis-frontend/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"speech-synthesis-frontend/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | voice-recorder', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <VoiceRecorder />
      */
      {
        "id": "iFCcJGJZ",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"voice-recorder\"]]",
        "moduleName": "/Users/johantorosjan/Desktop/jo-dev/MR/dev/speech-synthesis-frontend/speech-synthesis-frontend/tests/integration/components/voice-recorder-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <VoiceRecorder>
              template block text
            </VoiceRecorder>
          
      */
      {
        "id": "JDxGzdrh",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"voice-recorder\"]]",
        "moduleName": "/Users/johantorosjan/Desktop/jo-dev/MR/dev/speech-synthesis-frontend/speech-synthesis-frontend/tests/integration/components/voice-recorder-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("speech-synthesis-frontend/tests/integration/helpers/eq-test", ["qunit", "speech-synthesis-frontend/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"speech-synthesis-frontend/tests/helpers",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Helper | eq', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{eq this.inputValue}}
      */
      {
        "id": "ihjEs1uX",
        "block": "[[[1,[28,[35,0],[[30,0,[\"inputValue\"]]],null]]],[],false,[\"eq\"]]",
        "moduleName": "/Users/johantorosjan/Desktop/jo-dev/MR/dev/speech-synthesis-frontend/speech-synthesis-frontend/tests/integration/helpers/eq-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('1234');
    });
  });
});
define("speech-synthesis-frontend/tests/test-helper", ["speech-synthesis-frontend/app", "speech-synthesis-frontend/config/environment", "qunit", "@ember/test-helpers", "qunit-dom", "ember-qunit/test-loader", "ember-qunit"], function (_app, _environment, QUnit, _testHelpers, _qunitDom, _testLoader, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"speech-synthesis-frontend/app",0,"speech-synthesis-frontend/config/environment",0,"qunit",0,"@ember/test-helpers",0,"qunit-dom",0,"ember-qunit/test-loader",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _qunitDom.setup)(QUnit.assert);
  (0, _emberQunit.setupEmberOnerrorValidation)();
  (0, _testLoader.loadTests)();
  (0, _emberQunit.start)();
});
define("speech-synthesis-frontend/tests/unit/controllers/record-test", ["qunit", "speech-synthesis-frontend/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"speech-synthesis-frontend/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Controller | record', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:record');
      assert.ok(controller);
    });
  });
});
define("speech-synthesis-frontend/tests/unit/routes/informations-test", ["qunit", "speech-synthesis-frontend/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"speech-synthesis-frontend/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | informations', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:informations');
      assert.ok(route);
    });
  });
});
define("speech-synthesis-frontend/tests/unit/routes/record-test", ["qunit", "speech-synthesis-frontend/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"speech-synthesis-frontend/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record');
      assert.ok(route);
    });
  });
});
define("speech-synthesis-frontend/tests/unit/routes/synthese-test", ["qunit", "speech-synthesis-frontend/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"speech-synthesis-frontend/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | synthese', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:synthese');
      assert.ok(route);
    });
  });
});
define("speech-synthesis-frontend/tests/unit/services/ai-agents-test", ["qunit", "speech-synthesis-frontend/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"speech-synthesis-frontend/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | ai-agents', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:ai-agents');
      assert.ok(service);
    });
  });
});
define("speech-synthesis-frontend/tests/unit/services/audio-recorder-test", ["qunit", "speech-synthesis-frontend/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"speech-synthesis-frontend/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | audio-recorder', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:audio-recorder');
      assert.ok(service);
    });
  });
});
define("speech-synthesis-frontend/tests/unit/services/modal-test", ["qunit", "speech-synthesis-frontend/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"speech-synthesis-frontend/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | modal', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:modal');
      assert.ok(service);
    });
  });
});
define('speech-synthesis-frontend/config/environment', [], function() {
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

require('speech-synthesis-frontend/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
