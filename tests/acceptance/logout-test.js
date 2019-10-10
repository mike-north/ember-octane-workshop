import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubAuthService from '../stubs/auth-service';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubAuthService);
  });

  test('visiting /logout', async function(assert) {
    // get the auth service (it will be our stub)
    const authSvc = this.owner.lookup('service:auth');
    authSvc.testingUserId = '1';

    // type "/teams" into address bar, press enter
    await visit('/teams/linkedin/recruiting');
    // await this.pauseTest();

    assert.equal(currentURL(), '/teams/linkedin/recruiting');

    await click('.team-sidebar__logout-button');
    assert.equal(currentURL(), '/login');

    // await click('button');
  });
});
