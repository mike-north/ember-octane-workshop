import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubAuthService from '../stubs/auth-service';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubAuthService);
  });

  test('visiting /logout', async function(assert) {
    const auth = this.owner.lookup('service:auth');
    auth.setUserId('1'); // start logged in
    await visit('/teams/linkedin/jobs');
    assert.equal(currentURL(), '/teams/linkedin/jobs');

    await click('.team-sidebar__logout-button');
    assert.equal(currentURL(), '/login');

    // await click('select'); // ???
    // assert.equal(currentURL(), '/login');

    assert.equal(auth.currentUserId, '', 'User is logged out at the end');
  });
});
