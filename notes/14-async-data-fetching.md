# Async Data Fetching

In this exercise, we will be replacing the hard coded data that we added in previous exercises, with data fetched from server.

For fetching data from server, we are going to use the [fetch](https://developers.google.com/web/updates/2015/03/introduction-to-fetch) method that is natively available in most modern browsers. In our app, we use the [ember-fetch](https://github.com/ember-cli/ember-fetch) ember addon that uses a polyfill for fetch method, in browsers that don't support the fetch method. You can find more info about browser support for fetch method [here](https://caniuse.com/#feat=fetch).

We will be creating/editing the following files:

- [`../app/routes/login.js`](../app/routes/login.js)
- [`../app/routes/teams.js`](../app/routes/teams.js)
- [`../app/routes/teams/team.js`](../app/routes/teams/team.js)
- [`../app/routes/teams/team/channel.js`](../app/routes/teams/team/channel.js)
- [`../app/services/auth.js`](../app/services/auth.js)
- [`../app/templates/components/login-form.hbs`](../app/templates/components/login-form.hbs)
- [`../app/templates/login.hbs`](../app/templates/login.hbs)
- [`../tests/test-helpers/auth-service.js`](../tests/test-helpers/auth-service.js)
- [`../tests/integration/components/login-form-test.js`](../tests/integration/components/login-form-test.js)

Let's get started.

## Fetch data from server

First, in the `login` route defined at [`../app/routes/login.js`](../app/routes/login.js), fetch the list of users. Start with adding an import for the `fetch` method:.

```diff
+   import fetch from 'fetch';
```

Then, add a `model()` hook that returns the list of users fetched from server, by using the `fetch` method.

```diff
+   async model() {
+     const resp = await fetch('/api/users');
+     return resp.json();
+   }
```

In the `teams` route defined at [`../app/routes/teams.js`](../app/routes/teams.js), we need to fetch the following data related to the logged in user:

- User information
- list of related teams

Once again, import the `fetch` method at the top of the file, like we did for the login route:

```diff
+   import fetch from 'fetch';
```

If the user is logged in, the user's information should be loaded by calling the `loadCurrentUser()` method, that we are going to define in the `auth` service.

```diff
+   } else {
+     await this.auth.loadCurrentUser();
```

The list of related teams is loaded, by making an ajax call using the `fetch()` method in the `model()` hook.

```diff
-   model() {
-     return ALL_TEAMS;
+   async model() {
+     const resp = await fetch('/api/teams');
+     return resp.json();
```

Now that we are using data fetched from server, we don't need the hard coded array anymore. So, remove that.

```diff
-   export const ALL_TEAMS = [
-     {
-       id: 'li',
-       name: 'LinkedIn',
-       order: 2,
-       iconUrl:
-         'https://gravatar.com/avatar/0ca1be2eaded508606982feb9fea8a2b?s=200&d=https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png',
-       channels: [
-         {
-           id: 'general',
-           name: 'general',
-           description: 'LinkedIn general (professional) chat',
-           teamId: 'li',
-         },
-         {
-           id: 'secrets',
-           name: 'secrets',
-           description: 'professional secrets',
-           teamId: 'li',
-         },
-       ],
-     },
-     {
-       id: 'ms',
-       name: 'Microsoft',
-       order: 3,
-       iconUrl:
-         'https://gravatar.com/avatar/0ca1be2eaded508606982feb9fea8a2b?s=200&d=https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png',
-       channels: [
-         {
-           id: 'general',
-           name: 'general',
-           description: 'Microsoft general chat',
-           teamId: 'ms',
-         },
-         {
-           id: 'ie8-gripes',
-           name: 'IE8 Gripes',
-           description:
-             'A place for whining about old browsers',
-           teamId: 'ms',
-         },
-       ],
-     },
-   ];

```

Next file to be modified is the `team` route, defined at [`../app/routes/teams/team.js`](../app/routes/teams/team.js).

Replace the import for the hard coded array, with import for `fetch`.

```diff
-   import { ALL_TEAMS } from '../teams';
+   import fetch from 'fetch';
```

Then, edit the `model()` hook to fetch data for a specific selected team from server.

```diff
-   model({ teamId }) {
-     const matches = ALL_TEAMS.filter(
-       t => `${t.id}` === `${teamId}`
-     );
-     return matches[0];
+   async model({ teamId }) {
+     const resp = await fetch(`/api/teams/${teamId}`);
+     return resp.json();
```

Next file to be modified is the `channel` route defined at [`../app/routes/teams/team/channel.js`](../app/routes/teams/team/channel.js). This is the last `route` file to be modified as part of this exercise.

```diff
+   import fetch from 'fetch';
```

Edit the `model()` hook to fetch data from server.

```diff
-   model({ channelId }) {
-     const team = /** @type {{channels: {id: string}[]}} */ (this.modelFor(
+   async model({ channelId }) {
+     const {
+       teamId,
+     } = /** @type {{teamId: string}} */ (this.paramsFor(
```

```diff
-   const matches = team.channels.filter(
-     ch => `${ch.id}` === `${channelId}`
+   // const team = this.modelFor('teams.team');
+   const resp = await fetch(
+     `/api/teams/${teamId}/channels/${channelId}`
```

```diff
-   return matches[0];
+   return resp.json();
```

Next, modify the `auth` service defined at [`../app/services/auth.js`](../app/services/auth.js).

Add the required imports for using [`tracked`](https://glimmerjs.com/guides/tracked-properties) properties and `fetch` method:

```diff
+   import { tracked } from '@glimmer/tracking';
+   import fetch from 'fetch';
```

Then define a `tracked` property, `currentUser`:

```diff
+   @tracked currentUser = null;
```

Modify the `loginWithUserId` method as an `async` method, since it is going to be called with `await` keyword.

```diff
-   loginWithUserId(userId) {
+   async loginWithUserId(userId) {
```

Add the definition for `loadCurrentUser` method that we used earlier in the exercise, in the `teams` route, defined at [`../app/routes/teams.js`](../app/routes/teams.js).

```diff
+   async loadCurrentUser() {
+     const { currentUserId } = this;
+     if (!currentUserId) return;
+     this.currentUser = await (await fetch(
+       `/api/users/${currentUserId}`
+     )).json();
+   }
```

## Display fetched data

We are now done with all the data fetching needed for this exercise. Now its time to display them in our templates.

In the [`login`](../app/templates/login.hbs) template, pass the model data into the `login-form` component. Note here that the login-form component used here, is following angle bracket syntax.

```diff
-   <LoginForm />
+   <LoginForm @users={{this.model}}/>
```

In the [`login-form`](`../app/templates/components/login-form.hbs`) component template, replace the hard coded values in the user selection dropdown to dynamic values fetched from server. Here `@users` contains the dynamic data that was feed into it from the `login.hbs` template.

```diff
-   <option selected={{eq this.userId "1"}} value="1">Testy Testerson</option>
-   <option selected={{eq this.userId "2"}} value="2">Sample McData</option>
+   {{#each @users as |user|}}
+     <option selected={{eq this.userId (concat '' user.id)}} value={{user.id}}>{{user.name}}</option>
+   {{/each}}
```

## Test helper

In the `auth` service defined at [`../app/services/auth.js`](../app/services/auth.js), we added some new methods. Lets update the test helper present at [`../tests/test-helpers/auth-service.js`](../tests/test-helpers/auth-service.js) accordingly. This test helper makes sure every time tests are run, there is no state leakage across tests, and application state stored on the auth service is reset, before each test is run.

Add the import for `action` at the top of the file, in the imports section.

```diff
+   import { action } from '@ember/object';
```

Add definition for `loginWithUserId` method:

```diff
+   async loginWithUserId(id) {
+     this.currentUserId = id;
+     await this.loadCurrentUser();
+     this.router.transitionTo('teams');
+   }
```

Note that in the above updated method definition for `loginWithUserId`, we added a call to the new method, `loadCurrentUser()`. So lets add the definition for `loadCurrentUser` method accordingly.

```diff
+   async loadCurrentUser() {
+     if (!this.isAuthenticated) return;
+     this.currentUser = {
+       id: this.currentUserId,
+       name: 'Mike North',
+     };
+   }
```

```diff
+   @action
+   logout() {
+     this.currentUserId = null;
+     this.currentUser = null;
+     this.router.transitionTo('login');
+   }
```

## Tests

Update the tests for the [`login-form`](../tests/integration/components/login-form-test.js) component to reflect the changes we made earlier in this exercise, to replace all occurrences of hard coded data with data fetched from server.

```diff
-   await render(hbs`<LoginForm />`);
+   this.set('myUsers', [
+     { id: 1, name: 'Sample McFixture' },
+     { id: 2, name: 'Testy Assertington' },
+   ]);
+
+   await render(hbs`<LoginForm @users={{this.myUsers}}/>`);
```

```diff
-   ['Login', 'Select a user', 'Testy Testerson', 'Sample McData']
+   ['Login', 'Select a user', 'Sample McFixture', 'Testy Assertington']
```

```diff
+   this.set('myUsers', [
+     { id: 1, name: 'Sample McFixture' },
+     { id: 2, name: 'Testy Assertington' },
+   ]);
```

```diff
-   await render(hbs`<LoginForm />`);
+   await render(hbs`<LoginForm @users={{this.myUsers}}/>`);
```

```diff
-   'Testy Testerson',
-   'Sample McData',
+   'Sample McFixture',
+   'Testy Assertington',
```

And that's it. You are now done with this exercise!
