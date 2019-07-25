import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-timestamp', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{format-timestamp '04-21-2019 12:21:38 PM'}}`);
    assert.equal(this.element.textContent.trim(), 'Apr 21, 2019 00:21:38 AM');

    await render(hbs`{{format-timestamp '07-21-2019 12:21:38 PM'}}`);
    assert.equal(this.element.textContent.trim(), 'Jul 21, 2019 00:21:38 AM');
  });
});
