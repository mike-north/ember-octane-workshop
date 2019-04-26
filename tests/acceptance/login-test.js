import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Service, { inject as service } from '@ember/service';
import { Router } from '@ember/routing';
import StubbedAuthService from '../test-helpers/auth-service';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubbedAuthService);
  });

  test('starting logged out, then logging in', async function(assert) {
    StubbedAuthService.authenticatedUserId = null;
    await visit('/login');
    assert.equal(currentURL(), '/login');

    await fillIn('select[name="userId"]', '1');

    await click('form input[type="submit"]');

    assert.equal(currentURL(), '/teams');
  });

  test('already logged in', async function(assert) {
    StubbedAuthService.authenticatedUserId = '1';

    await visit('/login');

    assert.equal(currentURL(), '/teams');
  });
});
