import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-timestamp', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    await render(hbs`{{format-timestamp "Oct 9, 2019 10:00:00 AM"}}`);
    assert.equal(this.element.textContent.trim(), 'Oct 9, 2019 10:00.00 AM');
  });
});
