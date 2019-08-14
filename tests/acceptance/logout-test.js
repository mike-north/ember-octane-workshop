import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import AuthStubService from '../stubs/auth-service';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', AuthStubService);
  });

  test('visiting /teams', async function(assert) {
    // get the auth service
    const auth = this.owner.lookup('service:auth');
    auth._userId = '1';

    await visit('/teams'); // visit the teams page
    assert.ok(currentURL().startsWith('/teams')); // make sure we got there
    await click('.team-sidebar__logout-button'); // click "logout"
    assert.equal(currentURL(), '/login'); // should be looking at the login screen

    assert.equal(auth.currentUserId, '', 'We are logged out');
  });
});
