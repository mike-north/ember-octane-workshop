import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | team-selector', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    const ALL_TEAMS = [
      {
        id: 'li',
        name: 'LinkedIn',
        order: 2,
        iconUrl:
          'https://gravatar.com/avatar/0ca1be2eaded508606982feb9fea8a2b?s=200&d=https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png'
      },
      {
        id: 'ms',
        name: 'Microsoft',
        order: 3,
        iconUrl:
          'https://gravatar.com/avatar/0ca1be2eaded508606982feb9fea8a2b?s=200&d=https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png'
      }
    ];
    this.set('teams', ALL_TEAMS);

    await render(hbs`<TeamSelector @teams={{this.teams}}/>`);
    const images = this.element.querySelectorAll('img').values();
    const img1 = images.next().value;
    assert.equal(img1.src, ALL_TEAMS[0].iconUrl);

    const img2 = images.next().value;
    assert.equal(img2.src, ALL_TEAMS[1].iconUrl);
  });
});
