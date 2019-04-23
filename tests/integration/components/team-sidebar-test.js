import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | team-sidebar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('team', {
      id: 'li',
      name: 'LinkedIn',
      order: 2,
      iconUrl:
        'https://gravatar.com/avatar/0ca1be2eaded508606982feb9fea8a2b?s=200&d=https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png'
    });

    await render(hbs`<TeamSidebar @team={{this.team}} />`);

    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/(\s*[\n]+\s*)+/g, '\n')
        .split('\n'),
      ['LinkedIn', 'Channels', 'Logout']
    );
  });
});
