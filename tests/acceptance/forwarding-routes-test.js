import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubbedAuthService from '../test-helpers/auth-service';
import Pretender from 'pretender';

function jsonResponse(body) {
  return function(url, response) {
    return [200, {}, JSON.stringify(body)];
  };
}

/**
 * @this {Pretender}
 */
function setupServer() {
  this.get(
    '/api/teams',
    jsonResponse([
      {
        id: 'gh',
        name: 'GitHub'
      }
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
          name: 'Pull Requests'
        }
      ]
    })
  );
  this.get(
    '/api/teams/gh/channels/prs',
    jsonResponse({
      id: 'prs',
      name: 'Pull Requests'
    })
  );
}

module('Acceptance | forwarding routes', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubbedAuthService);
  });

  /**
   * @type {Pretender}
   */
  let server;
  hooks.beforeEach(function() {
    server = new Pretender(setupServer);
  });
  hooks.afterEach(function() {
    server.shutdown();
    server = null;
  });

  test('forwarding from /teams', async function(assert) {
    StubbedAuthService.authenticatedUserId = '1';
    await visit('/teams');

    assert.equal(currentURL(), '/teams/gh/prs');
  });
});
