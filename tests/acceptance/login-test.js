import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /login', async function(assert) {
    await visit('/login');

    assert.equal(currentURL(), '/login');

    await fillIn('select', '1');

    await click('form input[type="submit"]');

    assert.equal(currentURL(), '/teams');
  });
});
