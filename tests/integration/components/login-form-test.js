import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('users', [
      {
        id: 1,
        name: 'Testy Testerson'
      }
    ]);

    await render(hbs`<LoginForm @users={{this.users}} />`);

    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/(\s*[\n]+\s*)+/g, '\n')
        .split('\n'),

      ['User', 'Select a user', 'Testy Testerson', 'Sign In']
    );
  });
});
