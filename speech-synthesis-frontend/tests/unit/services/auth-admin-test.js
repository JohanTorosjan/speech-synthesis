import { module, test } from 'qunit';
import { setupTest } from 'speech-synthesis-frontend/tests/helpers';

module('Unit | Service | auth-admin', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:auth-admin');
    assert.ok(service);
  });
});
