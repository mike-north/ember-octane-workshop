import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('initially has no user selected, and "Sign In" button disabled', async function(assert) {
    await render(hbs`<LoginForm />`);

    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/\s*\n+\s*/g, '\n')
        .split('\n'),
      ['Login', 'Select a user', 'Testy Testerson', 'Sample McData']
    );

    let button = /** @type {HTMLInputElement} */ (find('input[type="submit"]'));
    let select = /** @type {HTMLSelectElement} */ (find('select'));

    assert.equal(select.value, '');

    assert.equal(button.disabled, true);
  });

  test('after selecting a user "Sign In" button enabled', async function(assert) {
    // Render the component
    await render(hbs`<LoginForm />`);

    // Pluck off the DOM elements we care about
    let button = /** @type {HTMLInputElement} */ (find('input[type="submit"]'));
    let select = /** @type {HTMLSelectElement} */ (find('select'));

    // Select the <option> with value="1"
    await fillIn('select', '1');

    assert.equal(select.value, '1', '<option value="1"> is currently selected');

    assert.equal(
      button.disabled,
      false,
      'The submit button is no longer disabled'
    );

    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/\s*\n+\s*/g, '\n')
        .split('\n'),
      [
        'Login',
        'Select a user',
        'Testy Testerson',
        'Sample McData',
        'Logging in with userId 1',
      ],
      'validation text now shows up'
    );
  });
});
