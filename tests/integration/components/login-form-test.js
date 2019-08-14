import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const HTML_LINES = /\s*\n+\s*/g;
export function lines(elem) {
  return elem.textContent
    .trim()
    .replace(HTML_LINES, '\n')
    .split('\n');
}

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('initially, no user selected, button disabled', async function(assert) {
    await render(hbs`<LoginForm />`);

    assert.deepEqual(
      lines(this.element),

      [
        'Login',
        'Select a user',
        'Testy Testerson',
        'Sample McData',
        'user: undefined',
      ]
    );
    const select = this.element.querySelector('select');
    assert.equal(select.value, '', 'No user initially selected');

    /** @type {HTMLButtonElement} */
    const submitButton = this.element.querySelector('input[type="submit"]');
    assert.equal(submitButton.disabled, true, 'Button is initially disabled');

    await fillIn('select', '2');
    assert.equal(select.value, '2', 'User now selected');
    assert.equal(submitButton.disabled, false, 'Button no longer disabled');
    // await this.pauseTest();
  });
});
