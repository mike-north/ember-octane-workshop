import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubbedAuthService from '../test-helpers/auth-service';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubbedAuthService);
  });

  test('starting logged out, then logging in', async function(assert) {
    const auth = this.owner.lookup('service:auth');
    auth.currentUserId = null;

    await visit('/login');
    assert.equal(currentURL(), '/login');

    await fillIn('select', '1');

    await click('form input[type="submit"]');

    assert.equal(currentURL(), '/teams');
  });

  test('already logged in', async function(assert) {
    const auth = this.owner.lookup('service:auth');
    auth.currentUserId = '1';

    await visit('/login');

    assert.equal(currentURL(), '/teams');
  });
});
