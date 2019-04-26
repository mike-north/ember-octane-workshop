import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-timestamp', function(
  hooks
) {
  setupRenderingTest(hooks);

  test('01-01-2019', async function(assert) {
    await render(hbs`{{format-timestamp '01-01-2019'}}`);
    assert.equal(
      ('' + this.element.textContent).trim(),
      'Jan 1, 2019 00:00.00 AM'
    );
  });

  test('No argument passed', async function(assert) {
    await render(hbs`{{format-timestamp}}`);
    assert.equal(
      ('' + this.element.textContent).trim(),
      '(unknown)'
    );
  });
});
