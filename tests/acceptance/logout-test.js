import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);
  //  javascript:resumeTest()
  test('visiting /teams', async function(assert) {
    await visit('/teams'); // visit the teams page
    assert.equal(currentURL(), '/teams'); // make sure we got there
    await click('.team-sidebar__logout-button'); // click "logout"
    assert.equal(currentURL(), '/login'); // should be looking at the login screen
  });
});
