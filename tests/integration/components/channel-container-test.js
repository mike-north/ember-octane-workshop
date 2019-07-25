import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Pretender from 'pretender';

function pretenderSetup() {
  this.get('/api/teams/linkedin/channels/recruiting/messages', function() {
    return [
      200,
      {},
      JSON.stringify([
        {
          teamId: 'li',
          channelId: 'compliments',
          userId: 2,
          createdAt: '2019-04-21T17:48:33.421Z',
          body: 'Your penmanship is excellent!',
          id: 1,
        },
        {
          teamId: 'li',
          channelId: 'compliments',
          userId: 1,
          createdAt: '2019-04-21T17:54:38.556Z',
          body: 'I admire your punctuality',
          id: 2,
        },
        {
          teamId: 'li',
          channelId: 'general',
          userId: 2,
          createdAt: '2019-04-21T17:55:08.713Z',
          body: 'Hello shlack!',
          id: 3,
        },
        {
          teamId: 'li',
          channelId: 'general',
          userId: 1,
          createdAt: '2019-04-21T18:36:30.995Z',
          body: 'awda',
          id: 11,
        },
      ]),
    ];
  });
}

module('Integration | Component | channel-container', function(hooks) {
  setupRenderingTest(hooks);

  let server;
  hooks.beforeEach(() => {
    server = new Pretender(pretenderSetup);
  });
  hooks.afterEach(() => {
    server.shutdown();
    server = null;
  });

  test('it renders', async function(assert) {
    this.set('myChannel', {
      id: 'recruiting',
      name: 'recruiting',
      description: 'The Next Generation Of Recruiting. Find top talents today!',
      teamId: 'linkedin',
    });
    await render(hbs`
      <ChannelContainer
        @channel={{this.myChannel}}
        as |messages|>
        <ul>
          {{#each messages as |m|}}
            <li>
              {{m.body}}</li>
          {{/each}}
        </ul>
      </ChannelContainer>
    `);
    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/\s*\n+\s*/g, '\n')
        .split('\n'),
      [
        'Your penmanship is excellent!',
        'I admire your punctuality',
        'Hello shlack!',
        'awda',
      ]
    );
  });
});
