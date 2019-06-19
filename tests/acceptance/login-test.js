import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import StubAuthService from '../stubs/auth-service';
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
  this.get('/api/users/:id', jsonResponse({ id: 1, name: 'Sample McFixture' }));
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
      name: 'Pull Requests',
    })
  );
  this.get(
    '/api/teams/gh/channels/prs/messages',
    jsonResponse([])
  );
}

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  let server;
  hooks.beforeEach(function() {
    server = new Pretender(setupServer);
  });
  hooks.afterEach(function() {
    server.shutdown();
    server = null;
  });

  hooks.beforeEach(function() {
    this.owner.register('service:auth', StubAuthService);
  });

  test('visiting /login', async function(assert) {
    await visit('/login');
    assert.equal(currentURL(), '/login');

    await fillIn('select', '1');

    await click('input[type="submit"]');
    assert.equal(currentURL(), '/teams/gh/prs');
  });
});
