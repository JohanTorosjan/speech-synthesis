import { module, test } from 'qunit';
import { setupTest } from 'speech-synthesis-frontend/tests/helpers';

module('Unit | Route | record', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:record');
    assert.ok(route);
  });
});
