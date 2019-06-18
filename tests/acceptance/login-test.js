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
    await visit('/login');
    assert.equal(currentURL(), '/login');

    await fillIn('select', '1');

    await click('input[type="submit"]');
    assert.equal(currentURL(), '/teams');
  });
});
