import { module, test } from 'qunit';
import { setupRenderingTest } from 'speech-synthesis-frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | informations-form', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<InformationsForm />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <InformationsForm>
        template block text
      </InformationsForm>
    `);

    assert.dom().hasText('template block text');
  });
});
