# First Routes

Our next step will be to add a login screen.

We'll want this to show up when the user visits http://localhost:4200/login,

![login-ui](./img/05-first-routes/login-ui.png)

and the chat UI showing up when users visit http://localhost:4200/teams

![chat-ui](./img/05-first-routes/chat-ui.png)

Whenever we think about URL-driven state (or content), [Routing](https://octane-guides-preview.emberjs.com/release/routing/) is likely to be involved

## The `/teams` route

The contents of our [app/templates/application.hbs](../app/templates/application.hbs) file is going to show up on the screen regardless of URL, so we'll want to change that first

Run the following command to generate a `teams` route

```sh
ember generate route teams
```

This should result in new files being created

- [`app/routes/teams.js`](../app/routes/teams.js) - the JS module for the route
- [`app/templates/teams.hbs`](../app/templates/teams.hbs) - a template to be shown when we visit `/teams`
- [`tests/unit/routes/teams-test.js`](../tests/unit/routes/teams-test.js) - a unit test for the route

You may also notice that your [`app/router.js`](../app/router.js) has been altered to "install" the new route.

We'll eventually dig into all of this, but for now

1. copy the contents of [`app/templates/application.hbs`](../app/templates/application.hbs) into [`app/templates/teams.hbs`](../app/templates/teams.hbs)
1. replace the contents of [`app/templates/application.hbs`](../app/templates/application.hbs) with `{{outlet}}`

You should now see...

- visiting http://localhost:4200/ shows a blank screen, with no JS errors in the console
- visiting http://localhost:4200/teams shows the chat UI

## The `/login` route

Run the following command to generate a `login` route

```sh
ember generate route login
```

This should result in new files being created

- [`app/routes/login.js`](../app/routes/login.js) - the JS module for the route
- [`app/templates/login.hbs`](../app/templates/login.hbs) - a template to be shown when we visit `/login`
- [`tests/unit/routes/login-test.js`](../tests/unit/routes/login-test.js) - a unit test for the route

Paste the HTML below into [`app/templates/login.hbs`](../app/templates/login.hbs)

<details>

<summary>Click to reveal login screen HTML</summary>

```html
<div class="mx-auto">
  <div class="flex justify-center flex-row w-full leading-loose text-3xl">
    Login
  </div>
  <div class="flex justify-center flex-row w-full">
    <div class="w-full max-w-xs">
      <form class="bg-grey-light shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="inline-block relative w-64 mt-2">
          <select
            class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a user</option>
            <option value="1">Testy Testerson</option>
            <option value="2">Sample McData</option>
          </select>
          <div
            class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              ></path>
            </svg>
          </div>
        </div>
        <p class="text-blue text-xs italic my-4">
          A validation message
        </p>
        <div class="flex items-center justify-between">
          <input
            class="bg-grey text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value="Sign In"
            type="submit"
          />
        </div>
      </form>
    </div>
  </div>
</div>
```

</details>

You should now see...

- visiting http://localhost:4200/ shows a blank screen, with no JS errors in the console
- visiting http://localhost:4200/login shows the login UI
- visiting http://localhost:4200/teams shows the chat UI

## Creating a basic link

In single-page apps we have to be careful when creating links. The default browser behavior is to trigger a page load, and this is not what we want.

Ember provides a tool for this called [`link-to`](https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/link-to?anchor=link-to).

`link-to` is a powerful tool, but for now we'll use it in a basic way: making the "Logout" button in the chat UI send the user to the login screen

First, open up [`app/templates/components/team-sidebar.hbs`](../app/templates/components/team-sidebar.hbs) and find the `Logout` button near the bottom.

```diff
@ team-sidebar.hbs:44 @
   </nav>

   <footer class="mx-4 mb-2 text-white">
-    <button class="text-white rounded bg-grey-dark hover:bg-red-darker p-2 logout-button">
+    <LinkTo @route='login' {{! destination route }}
+            @tagName="button" {{! use <button> instead of <a> }}
+            class="text-white rounded bg-grey-dark hover:bg-red-darker p-2 logout-button" {{! HTML classes}}
+    >
       Logout
-    </button>
+    </LinkTo>
   </footer>
 </section>
```
