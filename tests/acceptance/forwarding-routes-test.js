import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubbedAuthService from '../test-helpers/auth-service';
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
    '/api/users',
    jsonResponse([
      { id: 1, name: 'Sample McFixture' },
      { id: 2, name: 'Testy Assertington' },
    ])
  );
  this.get(
    '/api/teams',
    jsonResponse([
      {
        id: 'gh',
        name: 'GitHub',
      },
    ])
  );
  this.get(
    '/api/teams/gh',
    jsonResponse({
      id: 'gh',
      name: 'GitHub',
      channels: [
        {
          id: 'prs',
          teamId: 'gh',
          name: 'Pull Requests',
        },
      ],
    })
  );
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
    jsonResponse([])
  );
}

module('Acceptance | forwarding routes', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubbedAuthService);
  });

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

  test('forwarding from /teams', async function(assert) {
    const auth = this.owner.lookup('service:auth');
    auth.currentUserId = '1';

    await visit('/teams');

    assert.equal(currentURL(), '/teams/gh/prs');
  });
});
