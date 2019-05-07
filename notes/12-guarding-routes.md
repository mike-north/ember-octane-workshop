# Guarding Routes

In this exercise, we will be adding redirection in the UI flow based on the availability of an authenticated session.
Specifically, users should be able to access the `login` route, only when an authenticated session _does not exist_. And similarly, users should be able to access the `teams` route only when an authenticated _session exists_.

So let's get started.

## Changes Needed in Javascript

First let's implement the auth service that we will be using to do session validation(or invalidation). This auth service is defined at `app/services/auth.js`.

Import the action decorator at the top of the file:

```js
import { action } from '@ember/object';
```

Then add a property, `isAuthenticated` that will be used to store if the session is in an authenticated state, and an action method, `logout`, for invalidating the authenticated session and signing off the user.

```js
  get isAuthenticated() {
    return !!this.currentUserId;
  }

  @action
  logout() {
    window.localStorage.removeItem(AUTH_KEY);
    this.router.transitionTo('login');
  }
```

In the login route, present at `app/routes/login.js`, add a `beforeModel` hook to perform session validations and handle the UI flow accordingly.

In the login route, inject the imported `auth` service and add the `beforeModel` hook to perform session validation.

```js
   /**
   * @type {AuthService}
   */
  @service auth;

  async beforeModel(transition) {
    await super.beforeModel(transition);
    if (this.auth.isAuthenticated) {
      this.transitionTo('teams');
    }
  }
```

And, in the same route file(`login` route), import the `auth` service, since its not already available(injected).

```js
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';
```

Now let's move on to `teams` route.
Similar to `login` route, handle session validation in the `beforeModel` hook of the `teams` route after injecting the auth service into the route. There is a key difference to note here - the validation logic is flipped, that is the redirection will happen only when an authenticated session _does not exists_

In the `teams` route, inject the imported `auth` service and add the `beforeModel` hook to perform session validation.

```js
// app/routes/teams.js

   /**
   * @type {AuthService}
   */
  @service auth;

  async beforeModel(transition) {
    await super.beforeModel(transition);
    if (!this.auth.isAuthenticated) {
      this.transitionTo('login');
    }
  }
```

And, in the same route file(`teams` route), import the `auth` service, since its not already available(injected).

```js
// app/routes/teams.js
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';
```

## Changes in Templates

Now that we have the javascript implementation in place, lets add the UI for the same.
In `app/templates/components/team-sidebar.hbs`, replace the `LinkTo` component with a plain old HTML `button` element with an onclick handler that will trigger the `logout` action that you defined in `app/services/auth.js`.

```diff
-    <LinkTo @route='login' {{! destination route }}
-            @tagName="button" {{! use <button> instead of <a> }}
-            class="text-white rounded bg-grey-dark hover:bg-red-darker p-2 team-sidebar__logout-button" {{! HTML classes}}
+    <button {{on "click" this.auth.logout}} class="text-white rounded bg-grey-dark hover:bg-red-darker p-2 team-sidebar__logout-button"
+    >
      Logout
-    </LinkTo>
+    </button>
```

## Adding Tests

Now that we have the implementation in place for this exercise, lets add some tests for the same.
First, let's add some acceptance tests to make sure the UI interactions are working as expected.

In `tests/acceptance/login-test.js`, import the `StubbedAuthService` service:

```js
import StubbedAuthService from '../test-helpers/auth-service';
```

Then, inject the auth service inside the `beforeModel` hooks for test setup.

```js
hooks.beforeEach(function() {
  this.owner.register('service:auth', StubbedAuthService);
});
```

Modify the test with label, `starting logged out` as follows:

```js
test('starting logged out, then logging in', async function(assert) {
  const auth = this.owner.lookup('service:auth');
  auth.currentUserId = null;

  await visit('/login');
  assert.equal(currentURL(), '/login');

  await fillIn('select', '1');
  await click('form input[type="submit"]');

  assert.equal(currentURL(), '/teams');
});
```

Then add a test for the use case when the user is already logged in, as follows:

```js
test('already logged in', async function(assert) {
  const auth = this.owner.lookup('service:auth');
  auth.currentUserId = '1';

  await visit('/login');

  assert.equal(currentURL(), '/teams');
});
```

Now let's add acceptance tests to test when users for logged out. The test file is present at `tests/acceptance/logout-test.js`. And as in the previous test, first import the `StubbedAuthService` service:

```js
import StubbedAuthService from '../test-helpers/auth-service';
```

Then, remove the definition for test with label, 'visiting /teams'.
And add a test with label, `visiting /teams while logged in`.

Modify the `beforeEach` in the same way we did for the previous test.

```js
hooks.beforeEach(function() {
  this.owner.register('service:auth', StubbedAuthService);
});
```

Then add the test for accessing `teams` route while being logging in, and then logging out:

```js
test('visiting /teams while logged in, and then logging out', async function(assert) {
  const auth = this.owner.lookup('service:auth');
  auth.currentUserId = '1';

  await visit('/teams'); // Go to a URL

  assert.equal(currentURL(), '/teams'); // Make sure we've arrived
  await click('.team-sidebar__logout-button'); // Click a button

  assert.equal(currentURL(), '/login'); // Make sure we're now at /login
});
```

And finally, let's add a test when users visit `/teams` route when they are logged out.

```js
test('visiting /teams while logged out', async function(assert) {
  const auth = this.owner.lookup('service:auth');
  auth.currentUserId = null;

  await visit('/teams');

  assert.equal(currentURL(), '/login');
});
```
