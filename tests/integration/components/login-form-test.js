import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const TRIMMED_LINES = /\s*\n+\s*/g;
export const asLines = str => str.replace(TRIMMED_LINES, '\n').split('\n');

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('initially no user selected, and then we select one', async function(assert) {
    this.set('sampleUsers', [
      { name: 'Testy Testerson', id: '1' },
      { name: 'Sample McData', id: '2' },
    ]);
    await render(hbs`<LoginForm @users={{this.sampleUsers}}/>`);

    assert.deepEqual(asLines(this.element.textContent.trim()), [
      'Login',
      'Select a user',
      'Testy Testerson',
      'Sample McData',
      'A validation message',
    ]);
    /**
     * @type {HTMLButtonElement}
     */
    const btn = find('input[value="Sign In"]');
    /**
     * @type {HTMLSelectElement}
     */
    const select = find('select');
    assert.ok(btn.disabled, 'Button is initially disabed');
    assert.ok(!select.value, 'Select value is falsy');

    await fillIn('select', '1');

    assert.ok(!btn.disabled, 'Button is no longer disabed');
    assert.equal(select.value, '1', 'Select value is "1"');
  });
});
