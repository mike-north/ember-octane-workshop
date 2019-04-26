import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | channel-footer', function(
  hooks
) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ChannelFooter />`);

    assert.deepEqual(
      ('' + this.element.textContent)
        .trim()
        .replace(/\s*\n+\s*/g, '\n')
        .split('\n'),

      ['Message Input', 'Message', 'SEND']
    );
  });
});
