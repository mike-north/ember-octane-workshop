import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /logout', async function(assert) {
    // type "/teams" into address bar, press enter
    await visit('/teams');

    assert.equal(currentURL(), '/teams');

    await click('.team-sidebar__logout-button');
    assert.equal(currentURL(), '/login');

    // await click('button');
    await this.pauseTest();
  });
});
