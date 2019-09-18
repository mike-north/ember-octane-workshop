import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubAuthService from '../stubs/auth-service';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    /**
     * Whenever the auth service is requested for injection
     * use this subclass instead of what would normally be used
     */
    this.owner.register('service:auth', StubAuthService);
  });

  test('clicking the logout button should result in us arriving at the login screen', async function(assert) {
    this.owner.lookup('service:auth')._userId = '2';

    await visit('/teams/linkedin/recruiting');
    assert.equal(currentURL(), '/teams/linkedin/recruiting');
    // await this.pauseTest(); // resumeTest();
    await click('.team-sidebar__logout-button');

    assert.equal(currentURL(), '/login');
  });
});
