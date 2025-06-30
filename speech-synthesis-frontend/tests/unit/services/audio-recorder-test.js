import { module, test } from 'qunit';
import { setupTest } from 'speech-synthesis-frontend/tests/helpers';

module('Unit | Service | audio-recorder', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:audio-recorder');
    assert.ok(service);
  });
});
