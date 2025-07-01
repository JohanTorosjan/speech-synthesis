import { module, test } from 'qunit';
import { setupRenderingTest } from 'speech-synthesis-frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | code-selector', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CodeSelector />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <CodeSelector>
        template block text
      </CodeSelector>
    `);

    assert.dom().hasText('template block text');
  });
});
