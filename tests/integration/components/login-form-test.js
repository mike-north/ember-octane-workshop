import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('initial render sanity test', async function(assert) {
    await render(hbs`<LoginForm />`);

    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/\s*\n+\s*/g, '\n')
        .split('\n'),
      [
        'Select a user',
        'Testy Testerson',
        'Sample McData',
        'A validation message',
      ]
    );
  });

  test('initially no user selected, and "sign in" button disabled', async function(assert) {
    await render(hbs`<LoginForm />`);

    const select = find('select[data-testid="user-select"]');
    const button = find('input[type="submit"]');
    // @ts-ignore
    assert.equal(select.value, '', '<select> for user is initially empty');
    // @ts-ignore
    assert.equal(button.disabled, true, 'button is initially disabled');
  });

  test("after selecting a user, the 'sign in' button is enabled", async function(assert) {
    await render(hbs`<LoginForm />`);

    const button = find('input[type="submit"]');

    // @ts-ignore
    assert.equal(button.disabled, true, 'button is initially disabled');
    await fillIn('select[data-testid="user-select"]', '1');

    // @ts-ignore
    assert.equal(button.disabled, false, 'button is now enabled');
  });
});
