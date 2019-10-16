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
    this.owner.lookup('service:auth').uid = 1;
    // "visit the route"
    await visit('/teams/linkedin');
    // "is the URL what I expected?"
    assert.equal(currentURL(), '/teams/linkedin');
    // "click the logout button"
    await click('.team-sidebar__logout-button');
    // "looking at the /login screen"
    assert.equal(currentURL(), '/login');
  });
});
