# Forwarding Routes & Simulating Api Responses In Tests

In this exercise, we will be mainly focussing on:

- Conditionally forwarding routes
- Simulating API responses for tests
- Adding Tests

And we will be creating/editing the following files:

- [../app/routes/index.js](../app/routes/index.js)
- [../app/routes/teams/index.js](../app/routes/teams/index.js)
- [../app/routes/teams/team/index.js](../app/routes/teams/team/index.js)
- [../app/templates/teams/index.hbs](../app/templates/teams/index.hbs)
- [../app/templates/teams/team/index.hbs](../app/templates/teams/team/index.hbs)
- [../tests/acceptance/forwarding-routes-test.js](../tests/acceptance/forwarding-routes-test.js)
- [../tests/acceptance/login-test.js](../tests/acceptance/login-test.js)
- [../tests/acceptance/logout-test.js](../tests/acceptance/logout-test.js)
- [../tests/unit/routes/index-test.js](../tests/unit/routes/index-test.js)
- [../tests/unit/routes/teams/index-test.js](../tests/unit/routes/teams/index-test.js)
- [../tests/unit/routes/teams/team/index-test.js](../tests/unit/routes/teams/team/index-test.js)

## Forwarding Routes

For forwarding a user to a different route, other than the one that was attempted initially, we will use the [beforeModel](https://www.emberjs.com/api/ember/release/classes/Route/methods/transitionTo?anchor=beforeModel) hook, which is a good place to intercept requests, since it gets executed before the route fetches the data that UI needs.

And for the actual forwarding of a route to a different route, we will use the [transitionTo](https://api.emberjs.com/ember/release/classes/Route/methods/transitionTo?anchor=transitionTo) method, that is available on all routes.

Based on whether a user is logged in or not, a user trying to visit the main `index` route of the application, should be forwarded accordingly, to different routes. That is, logged in users should get forwarded to `teams` route, and users who are not logged in, should get forwarded to the `login` route.

_Index routes are child routes that will be displayed first by default, when a user visits any route. You can [read more about index routes](https://guides.emberjs.com/release/routing/defining-your-routes/#toc_index-routes) in emberjs from the [emberjs guides website](https://guides.emberjs.com)_.

For implementing this, define the `index` route at [`../app/routes/index.js`](../app/routes/index.js):

```diff
+   import Route from '@ember/routing/route';
+   import { inject as service } from '@ember/service';
+   import AuthService from 'shlack/services/auth';
+
+   export default class IndexRoute extends Route {
+     /**
+      * @type {AuthService}
+      */
+     @service auth;
+
+     beforeModel(transition) {
+       super.beforeModel(transition);
+       if (this.auth.isAuthenticated) {
+         this.transitionTo('teams');
+       } else {
+         this.transitionTo('login');
+       }
+     }
+   }
```

Similarly when a user tries to visit the `index` route under the `teams` or the `team` route, the user should be conditionally forwarded to different routes.

For `teams` route, if there is at least 1 team, the first team should be automatically displayed. Else, the index route is displayed with an appropriate message saying that that are no teams to display.

Add an `index` child route for `teams` route, at [`../app/routes/teams/index.js`](../app/routes/teams/index.js):

```diff
+   import Route from '@ember/routing/route';
+   import { isArray } from '@ember/array';
+
+   export default class TeamsIndexRoute extends Route {
+     beforeModel(transition) {
+       super.beforeModel(transition);
+       const teams = this.modelFor('teams');
+       if (teams && isArray(teams) && teams.length > 0)
+         this.transitionTo('teams.team', teams[0].id);
+     }
+   }
```

For `channels` route, if there is at least 1 channel associated with the selected team, the first channel is automatically displayed. Else, the index route under the channel route is displayed, with an appropriate message saying that that are no channels associated with the selected team.

Add an `index` child route for `channel` route, at [`../app/routes/teams/team/index.js`](../app/routes/teams/team/index.js):

```diff
+   import Route from '@ember/routing/route';
+   import { isArray } from '@ember/array';
+
+   export default class TeamsTeamIndexRoute extends Route {
+     beforeModel(transition) {
+       super.beforeModel(transition);
+       const {
+         channels,
+       } = /** @type {{channels: {id: string}[]}} */ (this.modelFor(
+         'teams.team'
+       ));
+       if (
+         channels &&
+         isArray(channels) &&
+         channels.length > 0
+       )
+         this.transitionTo(
+           'teams.team.channel',
+           channels[0].id
+         );
+     }
+   }
```

## Display Data In Templates

Now that we have all the data that we need, let's display them, by creating the needed templates. We will be using index route templates, which are templates that will be displayed first by default, when a user visits a route.

For the `teams` route, if there are no teams to be displayed, an appropriate message is displayed in it's corresponding index route, which we will be creating at [`../app/templates/teams/index.hbs`](../app/templates/teams/index.hbs):

```diff
+   <div class="mx-auto">
+     <div class="flex justify-center flex-row w-full leading-loose text-3xl">
+       No teams in this app
+     </div>
+   </div>
-   {{outlet}}
```

Similarly, for `channels` route, if there are no channels to be displayed, an appropriate message is displayed in it's corresponding index route, which we will be creating at [`../app/templates/teams/team/index.hbs`](../app/templates/teams/team/index.hbs):

```diff
+   <div class="mx-auto">
+     <div class="flex justify-center flex-row w-full leading-loose text-3xl">
+       No channels in this team
+     </div>
+   </div>
-   {{outlet}}
```

## Tests

We modified the team and teams routes, for conditionally forwarding a user to different routes. So, let's update the tests accordingly.

In the `login-test` test located at [`../tests/acceptance/login-test.js`](../tests/acceptance/login-test.js):

```diff
-   assert.equal(currentURL(), '/teams');
+   assert.ok(currentURL().startsWith('/teams'));
```

```diff
-   assert.equal(currentURL(), '/teams');
+   assert.ok(currentURL().startsWith('/teams'));
```

In the `logout-test` located at [`../tests/acceptance/logout-test.js`](../tests/acceptance/logout-test.js):

```diff
-   await visit('/teams/li'); // Go to a URL
+   await visit('/teams'); // Go to a URL
```

```diff
-   assert.equal(currentURL(), '/teams/li'); // Make sure we've arrived
+   assert.ok(currentURL().startsWith('/teams/li')); // Make sure we've arrived
```

We also added some routes in this exercise. So let's add some unit tests for the same.

For the `index` route, add an unit test at [`../tests/unit/routes/index-test.js`](../tests/unit/routes/index-test.js):

```diff
+   import { module, test } from 'qunit';
+   import { setupTest } from 'ember-qunit';
+
+   module('Unit | Route | index', function(hooks) {
+     setupTest(hooks);
+
+     test('it exists', function(assert) {
+       let route = this.owner.lookup('route:index');
+       assert.ok(route);
+     });
+   });
```

For the `teams` route, add an unit test at [`../tests/unit/routes/teams/index-test.js`](../tests/unit/routes/teams/index-test.js):

```diff
+   import { module, test } from 'qunit';
+   import { setupTest } from 'ember-qunit';
+
+   module('Unit | Route | teams/index', function(hooks) {
+     setupTest(hooks);
+
+     test('it exists', function(assert) {
+       let route = this.owner.lookup('route:teams/index');
+       assert.ok(route);
+     });
+   });
```

And finally, for the `channels` route, add an unit at [`../tests/unit/routes/teams/team/index-test.js`](../tests/unit/routes/teams/team/index-test.js):

```diff
+   import { module, test } from 'qunit';
+   import { setupTest } from 'ember-qunit';
+
+   module('Unit | Route | teams/team/index', function(hooks) {
+     setupTest(hooks);
+
+     test('it exists', function(assert) {
+       let route = this.owner.lookup('route:teams/team/index');
+       assert.ok(route);
+     });
+   });
```

## Simulating Responses In Tests

Now, let's add some tests for testing the route forwarding implementation, that we added earlier in this exercise.

In the acceptance tests, we will be simulating API responses using [pretender](https://github.com/pretenderjs/pretender)(a mock server library), which we include in this application, by using the [ember-cli-pretender](https://github.com/rwjblue/ember-cli-pretender) addon.

Create a new file for adding acceptance test at [`../tests/acceptance/forwarding-routes-test.js`](../tests/acceptance/forwarding-routes-test.js):

```diff
+   import { module, test } from 'qunit';
+   import { visit, currentURL } from '@ember/test-helpers';
+   import { setupApplicationTest } from 'ember-qunit';
+   import StubbedAuthService from '../test-helpers/auth-service';
+   import Pretender, { ResponseHandler } from 'pretender';
+
+   /**
+    *
+    * @param {any} body
+    * @returns {ResponseHandler}
+    */
+   function jsonResponse(body) {
+     return function() {
+       return [200, {}, JSON.stringify(body)];
+     };
+   }
+
+   /**
+    * @this {Pretender}
+    */
+   function setupServer() {
+     this.get(
+       '/api/users',
+       jsonResponse([
+         { id: 1, name: 'Sample McFixture' },
+         { id: 2, name: 'Testy Assertington' },
+       ])
+     );
+     this.get(
+       '/api/teams',
+       jsonResponse([
+         {
+           id: 'gh',
+           name: 'GitHub',
+         },
+       ])
+     );
+     this.get(
+       '/api/teams/gh',
+       jsonResponse({
+         id: 'gh',
+         name: 'GitHub',
+         channels: [
+           {
+             id: 'prs',
+             name: 'Pull Requests',
+           },
+         ],
+       })
+     );
+     this.get(
+       '/api/teams/gh/channels/prs',
+       jsonResponse({
+         id: 'prs',
+         name: 'Pull Requests',
+       })
+     );
+   }
+
+   module('Acceptance | forwarding routes', function(hooks) {
+     setupApplicationTest(hooks);
+
+     hooks.beforeEach(function() {
+       this.owner.register('service:auth', StubbedAuthService);
+     });
+
+     /**
+      * @type {Pretender | null}
+      */
+     let server;
+     hooks.beforeEach(function() {
+       server = new Pretender(setupServer);
+     });
+     hooks.afterEach(function() {
+       server && server.shutdown();
+       server = null;
+     });
+
+     test('forwarding from /teams', async function(assert) {
+       const auth = this.owner.lookup('service:auth');
+       auth.currentUserId = '1';
+
+       await visit('/teams');
+
+       assert.equal(currentURL(), '/teams/gh/prs');
+     });
+   });
```

In the above code that we added, apart from the actual tests, there are other functions that we used, to make the tests work correctly:

- `setupServer` - function that takes care of simulating API responses used in the acceptance tests, by intercepting http requests using [pretender](https://github.com/pretenderjs/pretender), and responding with hard coded data.
- `jsonResponse` - helper function that converts the raw response data, in this case, an array of objects, and converts it into a format that can be used by `setupServer` method.

And that's it. We have now successfully implemented conditional route forwarding, and added tests for the same.
