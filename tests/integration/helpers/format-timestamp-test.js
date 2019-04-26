import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-timestamp', function(hooks) {
  setupRenderingTest(hooks);

  test('01-01-2019', async function(assert) {
    await render(hbs`{{format-timestamp '01-01-2019'}}`);
    assert.equal(this.element.textContent.trim(), 'Jan 1, 2019 00:00.00 AM');
  });

  test('04/05/1983', async function(assert) {
    await render(hbs`{{format-timestamp '04/05/1983'}}`);
    assert.equal(this.element.textContent.trim(), 'Apr 5, 1983 00:00.00 AM');
  });

  test('26 June 2010 13:14', async function(assert) {
    await render(hbs`{{format-timestamp '26 June 2010 13:14'}}`);
    assert.equal(this.element.textContent.trim(), 'Jun 26, 2010 01:14.00 PM');
  });

  test('No argument passed', async function(assert) {
    await render(hbs`{{format-timestamp}}`);
    assert.equal(this.element.textContent.trim(), '(unknown)');
  });
});
