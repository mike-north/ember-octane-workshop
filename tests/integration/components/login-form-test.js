import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const TRIMMED_LINES = /\s*\n+\s*/g;
export const asLines = str => str.replace(TRIMMED_LINES, '\n').split('\n');

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<LoginForm />`);

    assert.deepEqual(asLines(this.element.textContent.trim()), [
      'Login',
      'Select a user',
      'Testy Testerson',
      'Sample McData',
      'A validation message',
    ]);
  });
});
