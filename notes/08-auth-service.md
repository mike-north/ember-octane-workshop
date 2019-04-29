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

run the following

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
  currentUserId = null;
  get isAuthenticated() {
    return !!this.currentUserId;
  }
}
```

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
