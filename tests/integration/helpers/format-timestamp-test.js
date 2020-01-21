import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-timestamp', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('myDate', 'Oct 14, 2019');

    await render(hbs`{{format-timestamp this.myDate}}`);

    assert.equal(
      this.element.textContent.trim(),
      'Oct 14, 2019 00:00.00 AM',
      'helper is connected to underlying date formatting function'
    );
  });
});
