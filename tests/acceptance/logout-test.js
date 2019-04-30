import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /teams', async function(assert) {
    await visit('/teams'); // Go to a URL

    assert.equal(currentURL(), '/teams'); // Make sure we've arrived

    await click('.team-sidebar__logout-button'); // Click a button

    assert.equal(currentURL(), '/login'); // Make sure we're now at /login
  });
});
