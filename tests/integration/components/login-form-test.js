import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
    
   <h3>Testing!!!</h3> 
    <LoginForm />`);

    assert.ok(
      this.element.textContent.includes('Select a user'),
      '"Select a user" is rendered'
    );

    const [select] = await findAll('select');
    const [btn] = await findAll('input[type="submit"]');
    assert.ok(select, '<select> is found');
    assert.ok(btn, '<input type="submit"> is found');
    assert.notOk(select.value, '<select> value is falsy');
    assert.equal(btn.disabled, true, 'button is initially disabled');

    await fillIn('select', '1');
    assert.equal(select.value, '1', '<select>.value = 1');
    assert.equal(btn.disabled, false, 'button is no longer disabled');
  });
});
