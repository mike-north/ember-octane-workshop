import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubAuthService from '../stubs/auth-service';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubAuthService);
  });

  test('visiting /login', async function(assert) {
    await visit('/login'); // visit the login page
    assert.equal(currentURL(), '/login'); // got there ok

    await fillIn('select', '1'); // pick user with id 1

    await click('input[type="submit"]'); // click "sign in"

    assert.equal(currentURL(), '/teams/linkedin/recruiting'); // got there ok
  });
});
