# Authentication Service & Login Flow

Services allow state and functionality (i.e., regular functions, actions) to be shared across various parts of an Ember app.

In our case, there are various things that may need to "see" or "use" authentication concerns (i.e., a `currentUser`).

- Creating a new chat message
- Preventing unauthenticated users from entering the app
- Logging in
- Logging out

We could use a component for this, but it would increase the complexity of our templates, and would involve passing extra args through the component tree.

```hbs
<Auth as |authApi|>
  <TeamSelector @auth={{authApi}} />
  <TeamSidebar @auth={{authApi}} />
  <main class="flex-1 flex flex-col bg-white overflow-hidden channel">
    <ChannelHeader @auth={{authApi}} />

    <div class="py-4 flex-1 overflow-y-scroll channel-messages-list" role="list">
      <ChatMessage />
      <ChatMessage />
    </div>

    <ChannelFooter @auth={{authApi}} />
  </main>
</Auth>
```

This is pretty ugly, and gets uglier as more of these cross-cutting areas are added, and more things need to access them. Thankfully, Services allow a better way of accomplishing the same thing...

<hr>
<p>
  <blockquote>
    <h3>
      💡 Mike's Tip: Services in Angular & React
    </h3>
    <a href="https://github.com/mike-north">
      <img src="https://github.com/mike-north.png" height=64 align="left" style="margin-right: 10px" />
    </a>
    <p>
      Sharing state "horizontaly" across many different concerns in an app is not unique to Ember.js. <a href="https://reactjs.org/docs/context.html">React's Context API</a> and <a href="https://angular.io/guide/dependency-injection">Angular's Dependency Injection</a> system are designed to solve the same problem.
    </p>
  </blockquote>
</p>
<hr>

Run the following

```
ember generate service auth
```

This will result in two new files being created

- [`app/services/auth.js`](../app/services/auth.js) - the service
- [`tests/unit/services/auth-test.js`](../tests/unit/services/auth-test.js) - a unit test for the service

First, let's flesh out the service so that we can use it in a few places.

```js
import Service from '@ember/service';

export default class AuthService extends Service {
  /**
   * @type {Router}
   */
  @service router;

  /**
   *
   * @param {string} userId
   */
  loginWithUserId(userId) {
    window.localStorage.setItem(AUTH_KEY, userId);
    this.router.transitionTo('teams');
  }

  get currentUserId() {
    return window.localStorage.getItem(AUTH_KEY);
  }
}
```

### Delegating "logging in" to the login component

Let's use this service in our `<LoginForm />` component in [`app/components/login-form.js`](../app/components/login-form.js)

Start by adding these imports

```js
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';
```

inject the service onto the component

```ts
  /**
   * @type {AuthService}
   */
  @service auth;
```

and update the `handleSignIn` function to make use of it

```diff
   handleSignIn(value) {
-    console.log(value);
+    if (typeof value === 'string' && value.length > 0)
+      this.auth.loginWithUserId(value);
   }
```

### Rendering authentication data in the chat UI

Let's show the ID of the currently logged in user in the chat sidebar component. We just have a `.hbs` file so far, so let's upgrade it to a proper component

**BE SURE NOT TO OVERWRITE THE TEMPLATE**

```sh
ember generate component chat-sidebar
```

in the newly-created [`app/components/team-sidebar.js`](../app/components/team-sidebar.js), add the following service injection

```diff
 import Component from '@glimmer/component';
+import { inject as service } from '@ember/service';
+import AuthService from 'shlack/services/auth';

 export default class TeamSidebarComponent extends Component {
+  /**
+   * @type {AuthService}
+   */
+  @service auth;
 }
```

in [`app/templates/components/chat-sidebar.hbs`](../app/templates/components/chat-sidebar.hbs) use the currentUserId value from the service

```diff
         <span class="team-sidebar__current-user-name text-white opacity-50 text-sm">
-          Mike North
+          Mike North ({{this.auth.currentUserId}})
         </span>
       </div>
     </div>
```

### Tests

Update the component test at [`tests/integration/components/team-sidebar-test.js`](../tests/integration/components/team-sidebar-test.js) so that it uses the following assertion

```js
assert.deepEqual(
  this.element.textContent
    .trim()
    .replace(/\s*\n+\s*/g, '\n')
    .split('\n'),
  ['LinkedIn', 'Mike North (1)', 'Channels', '#', 'general', 'Logout']
);
```

Create a new acceptance test for logging in

```sh
ember generate acceptance-test login
```

Open [`tests/acceptance/login-test.js`](../tests/acceptance/login-test.js) and replace the example assertions with

```ts
await visit('/login');

assert.equal(currentURL(), '/login');

await fillIn('select', '1');

await click('form input[type="submit"]');

assert.equal(currentURL(), '/teams');
```

Being sure to import what you need from `@ember/test-helpers`

```ts
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
```
