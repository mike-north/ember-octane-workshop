import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubAuthService from '../stubs/auth-service';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubAuthService);
  });

  test('visiting /teams and logging out', async function(assert) {
    const auth = this.owner.lookup('service:auth');
    auth._setUserId('1');
    await visit('/teams/linkedin');
    assert.equal(currentURL(), '/teams/linkedin');

    await click('.team-sidebar__logout-button');
    assert.equal(currentURL(), '/login');

    assert.ok(!auth._getUserId(), 'user is logged out');
  });
});
