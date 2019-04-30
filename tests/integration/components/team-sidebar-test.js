import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import StubbedAuthService from 'shlack/tests/test-helpers/auth-service';

module('Integration | Component | team-sidebar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubbedAuthService);
  });

  test('it renders', async function(assert) {
    const auth = this.owner.lookup('service:auth');
    auth.currentUserId = 'LOL';

    await render(hbs`<TeamSidebar />`);

    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/\s*\n+\s*/g, '\n')
        .split('\n'),
      ['LinkedIn', 'Mike North (LOL)', 'Channels', '#', 'general', 'Logout']
    );
  });
});
