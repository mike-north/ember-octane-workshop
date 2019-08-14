import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { lines } from './login-form-test';

module('Integration | Component | team-sidebar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<TeamSidebar />`);

    assert.deepEqual(lines(this.element), [
      'LinkedIn',
      'Mike North',
      'Channels',
      '#',
      'general',
      'Logout',
    ]);
  });
});
