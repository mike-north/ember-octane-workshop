import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | team/show/channel', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:teams.team.channel');
    assert.ok(route);
  });
});
