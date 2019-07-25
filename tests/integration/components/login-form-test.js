import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

//     \s* any amount of whitespace
//     \n+ one or more newlines
//     /g  match all you find (not just 1st)
export const prepareString = /\s*\n+\s*/g;

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('initially no user selected, submit button disabled', async function(assert) {
    await render(hbs`<LoginForm />`);
    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(prepareString, '\n')
        .split('\n'),
      ['Login', 'Select a user', 'Testy Testerson', 'Sample McData', 'id=']
    );
    /**
     * @type {HTMLButtonElement}
     */
    const button = this.element.querySelector('input[type="submit"]');
    assert.ok(button, 'button is on the screen');

    assert.equal(
      button.hasAttribute('disabled'),
      true,
      'initially the disabled attribute is PRESENT'
    );
  });

  test('after selecting a user, submit button enables', async function(assert) {
    await render(hbs`<LoginForm />`);

    const button = this.element.querySelector('input[type="submit"]');

    assert.equal(
      button.hasAttribute('disabled'),
      true,
      'initially the disabled attribute is PRESENT'
    );

    //  const userSelect = find('select');
    await fillIn('select', '1');

    assert.equal(
      button.hasAttribute('disabled'),
      false,
      'initially the disabled attribute is ABSENT'
    );
  });
});
