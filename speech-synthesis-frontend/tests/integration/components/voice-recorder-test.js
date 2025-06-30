import { module, test } from 'qunit';
import { setupRenderingTest } from 'speech-synthesis-frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | voice-recorder', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<VoiceRecorder />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <VoiceRecorder>
        template block text
      </VoiceRecorder>
    `);

    assert.dom().hasText('template block text');
  });
});
