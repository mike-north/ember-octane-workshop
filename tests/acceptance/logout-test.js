import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  test('clicking the logout button should result in us arriving at the login screen', async function(assert) {
    await visit('/teams');
    // await this.pauseTest(); // resumeTest();
    await click('.team-sidebar__logout-button');

    assert.equal(currentURL(), '/login');
  });
});
