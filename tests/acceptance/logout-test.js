import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /logout', async function(assert) {
    // "visit the route"
    await visit('/teams');
    // "is the URL what I expected?"
    assert.equal(currentURL(), '/teams');
    // "click the logout button"
    await click('.team-sidebar__logout-button');
    // "looking at the /login screen"
    assert.equal(currentURL(), '/login');
  });
});
