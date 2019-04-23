import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | chat-message', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('message', {
      body: 'foo',
      user: {
        name: 'Testy Testerson',
        iconUrl: 'http://placehold.it/48/48'
      },
      createdAt: new Date('01-01-2019').valueOf()
    });

    this.set('onDelete', function() {});
    this.set('noFollow', function() {});

    await render(hbs`<ChatMessage
      @message={{this.message}}
      @noFollowLink={{this.noFollow}}
      @deleteChatMessage={{this.onDelete}}
    />
`);

    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/(\s*[\n]+\s*)+/g, '\n')
        .split('\n'),
      ['Testy Testerson', 'at', 'Jan 1, 2019 0:0.0 PM', 'foo', '🗑']
    );
  });
});
