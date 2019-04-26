import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Pretender, { ResponseHandler } from 'pretender';

/**
 *
 * @param {any} body
 * @returns {ResponseHandler}
 */
function jsonResponse(body) {
  return function() {
    return [200, {}, JSON.stringify(body)];
  };
}

/**
 * @this {Pretender}
 */
function setupServer() {
  this.get(
    '/api/teams/gh/channels/prs',
    jsonResponse({
      id: 'prs',
      teamId: 'gh',
      name: 'Pull Requests',
    })
  );
  this.get(
    '/api/teams/gh/channels/prs/messages',
    jsonResponse([
      {
        id: 1,
        user: {
          name: 'Testy Testerson',
        },
        body: 'Hello Tests',
      },
    ])
  );
}

module(
  'Integration | Component | channel-container',
  function(hooks) {
    setupRenderingTest(hooks);

    /**
     * @type {Pretender | null}
     */
    let server;
    hooks.beforeEach(function() {
      server = new Pretender(setupServer);
    });
    hooks.afterEach(function() {
      server && server.shutdown();
      server = null;
    });

    test('it renders', async function(assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      this.set('myChannel', {
        id: 'prs',
        teamId: 'gh',
        name: 'Pull Requests',
      });

      await render(hbs`
      <ChannelContainer @channel={{this.myChannel}} as |ch|>
        <ul>
          {{#each ch.messages as |message|}}
            <li>({{message.id}}) {{message.user.name}} - {{message.body}}</li>
          {{/each}}
        </ul>
        template block text
      </ChannelContainer>
    `);

      assert.deepEqual(
        ('' + this.element.textContent)
          .trim()
          .replace(/\s*\n+\s*/g, '\n')
          .split('\n'),

        [
          '(1) Testy Testerson - Hello Tests',
          'template block text',
        ]
      );
    });
  }
);
