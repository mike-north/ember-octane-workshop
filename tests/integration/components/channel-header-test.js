import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | channel-header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('channel', {
      name: 'compliments',
      description: 'say something nice'
    });

    await render(hbs`<ChannelHeader @channel={{this.channel}} />`);

    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/(\s*[\n]+\s*)+/g, '\n')
        .split('\n'),
      ['#compliments', 'say something nice', 'Search messages']
    );
  });
});
