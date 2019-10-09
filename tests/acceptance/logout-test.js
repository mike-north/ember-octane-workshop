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
    // type "/teams" into address bar, press enter
    await visit('/teams');

    assert.equal(currentURL(), '/teams');

    await click('.team-sidebar__logout-button');
    assert.equal(currentURL(), '/login');

    // await click('button');
  });
});
