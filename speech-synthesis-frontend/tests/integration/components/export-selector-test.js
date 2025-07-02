import { module, test } from 'qunit';
import { setupRenderingTest } from 'speech-synthesis-frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | export-selector', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ExportSelector />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <ExportSelector>
        template block text
      </ExportSelector>
    `);

    assert.dom().hasText('template block text');
  });
});
