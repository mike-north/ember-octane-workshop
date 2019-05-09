# Guarding Routes

In this exercise, we will be adding redirection in the UI flow based on the availability of an authenticated session.
Specifically, users should be able to access the `login` route, only when an authenticated session _does not exist_. And similarly, users should be able to access the `teams` route only when an authenticated _session exists_.

So let's get started.

## Changes Needed in Javascript

First let's enhance the auth service so that we can easily tell if there's a logged in user, and implement a `logout` action. This auth service is defined at [`app/services/auth.js`](../app/services/auth.js). 

Import the action decorator at the top of the file:

```js
import { action } from '@ember/object';
```

Then add a getter-based property, `isAuthenticated` that will be `true` if the user is logged in and `false` otherwise. Add an action called `logout` that clears the user ID we write to localStorage on login, and sends the user to the `/login` page.

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

In the login route, present at [`app/routes/login.js`](../app/routes/login.js), add a `beforeModel` hook to check whether the user is authenticated, and either redirect the user or not.

In the login route, inject the imported `auth` service and add the following `beforeModel` hook.

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
The `login` route should have a similar `beforeModel` hook, but note that the validation logic is flipped. We redirect to the `/login` page only the user is _logged out_.

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

Now that we have the implementation in place for our redirect logic, lets add some tests for the same.
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

Remove the definition for test with label, 'visiting /teams'.
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
