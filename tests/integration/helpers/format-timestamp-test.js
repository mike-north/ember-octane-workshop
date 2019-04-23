import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-timestamp', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    const d = new Date('01-01-2019');
    this.set('inputValue', d.valueOf());

    await render(hbs`{{format-timestamp inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Jan 1, 2019 0:0.0 PM');
  });
});
