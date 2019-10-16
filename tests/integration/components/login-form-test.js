import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, fillIn, currentURL } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<LoginForm />`);

    assert.ok(this.element.textContent.trim().includes('Select a user'));

    const btn = find('input[type="submit"]');
    const sel = find('select');
    assert.ok(btn, 'Found a button');
    assert.ok(sel, 'Found a select');

    assert.ok(btn.disabled, 'Button is initially disabled');
    assert.equal(sel.value, '', 'No user selected');
    assert.equal(
      sel.options[sel.selectedIndex].disabled,
      true,
      'Initial selection cannot be picked by a user'
    );
    assert.ok(sel.options);

    await fillIn(sel, '1');

    assert.notOk(btn.disabled, 'Button is now enabled');
    assert.equal(sel.value, '1', 'User 1 selected');
  });
});
