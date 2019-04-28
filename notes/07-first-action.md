# First Action

Actions are Ember's mechanism for handling user interactions through DOM events, and most often are associated with Components.

In our app, we'll need an action in order to properly handle the Login `<form>`'s "submit" event. You can think of this as kind of like defining an `onSubmit` handler

```html
<script>
  function myFunction() {
    // handling logic
  }
</script>
<form id="loginForm" onSubmit="myFunction()">
  ...
</form>
```

or, more accurately

```html
<form id="loginForm">
  ...
</form>
```

```js
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function myFunction() {
  // handling logic
});
```

We'll see in a moment that we don't have to worry about the _imperative process_ that Ember uses to install an event listener -- we have a _declarative API_ for setting them up.

## Creating a component with a JS module

Let's begin by creating a dedicated `<LoginForm/>` component that we can use in our [`app/templates/login.hbs`](../app/templates/login.hbs) template

Please run

```sh
ember generate component login-form
```

and observe that three files are created

- [`app/components/login-form.js`](../app/components/login-form.js) - The component JS module
- [`app/templates/components/login-form.hbs`](../app/templates/components/login-form.hbs) - The component's template
- [`tests/integration/components/login-form-test.js`](../tests/integration/components/login-form-test.js) - An integration test for the component

1. Move the contents of [`app/templates/login.hbs`](../app/templates/login.hbs) into the [`app/templates/components/login-form.hbs`](../app/templates/components/login-form.hbs) template
1. Use your new component in [`app/templates/login.hbs`](../app/templates/login.hbs). It should now only contain `<LoginForm />`

## "Sign In" action

Go to [`app/components/login-form.js`](../app/components/login-form.js) and add a method to the class

```js
/**
 * Handle the form submit event
 * @param {Event & { target: HTMLFormElement }} evt
 */
onLoginFormSubmit(evt /* DOM event */) {
  const { target } = evt;
  const selectElem = target.querySelector('select');
  console.log(selectElem.value);
}
```

In your template, you'll have to hook this event handler up to the `<form>` DOM element using `{{on}}` like this

```hbs
<form {{on "submit" this.onLoginFormSubmit}} ... >
```

`{{on}}` is called a Modifier. We can recognize modifiers because they're kind of "floating" in a HTML tag, not associated with any particular HTML attribute.

```hbs
<div {{my-modifier}} >
```

In this example

```hbs
<div class={{my-helper}} >
```

because the `{{my-helper}}` is associated with the `class` attribute of the `<div>` -- we know it cannot be a modifier.

In this example

```hbs
<div onClick={{my-helper (my-m 1 2 3)}} >
<div {{foo (bar "hello") "world"}}>
```

because the `{{my-helper}}` is associated with the `class` attribute of the `<div>` -- we know it cannot be a modifier.

Open your devtools and try your use of the `{{on}}` modifier out. You may notice that the selected user ID is logged to the console _briefly_ and then disappears. Why is this?

The default behavior of a form submit is to make a GET request to the current URL w/ form data serialized into queryParams. This means our single-page app is reloaded -- not what we want. We need to prevent this default behavior -- any ideas as to how we might do this?

Update your event handler to use [`Event.preventDefault();`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault), so that the default form behavior is avoided

```js
/**
 * Handle the form submit event
 * @param {Event & { target: HTMLFormElement }} evt
 */
onLoginFormSubmit(evt /* DOM event */) {
  const { target } = evt;
  const selectElem = target.querySelector('select');
  evt.preventDefault();
  console.log(selectElem.value);
}
```

This should work more reasonably now.

Let's try to refactor `onLoginFormSubmit` so that it calls another function which does the logging to the console.

```js
import Component from '@glimmer/component';

export default class LoginFormComponent extends Component {
  handleSignIn(value) {
    console.log(value);
  }

  /**
   * Handle the form submit event
   * @param {Event & { target: HTMLFormElement }} evt
   */
  onLoginFormSubmit(evt) {
    const { target } = evt;
    const selectElem = target.querySelector('select');
    evt.preventDefault();
    this.handleSignIn(selectElem.value);
  }
}
```

Seems like it should work. Let's try it!

Oops! we'll get an error.

```
login-form.js:23 Uncaught TypeError: this.handleSignIn is not a function
    at HTMLFormElement.onLoginFormSubmit (login-form.js:23)
```

Let's dig deeper to investigate using a `debugger;`

```js
/**
 * Handle the form submit event
 * @param {Event & { target: HTMLFormElement }} evt
 */
onLoginFormSubmit(evt) {
  const { target } = evt;
  const selectElem = target.querySelector('select');
  evt.preventDefault();
  debugger;
  this.handleSignIn(selectElem.value);
}
```

Can you spot the problem? What about `this`?

The way the DOM API works, event handlers are called with `this` as the DOM element that received the event. This is not good in our case -- we want `this` to be the `<LoginForm />` component instance.

To fix this, we'll have to `bind` the `onLoginFormSubmit` method, so that no matter who invokes it or how, `this` will always be the component instance. In Ember Octane, this can be done easily by applying the **action decorator**

```js
/**
 * Handle the form submit event
 * @param {Event & { target: HTMLFormElement }} evt
 */
@action // << ACTION DECORATOR
onLoginFormSubmit(evt) {
  const { target } = evt;
  const selectElem = target.querySelector('select');
  evt.preventDefault();
  debugger;
  this.handleSignIn(selectElem.value);
}
```

Stop at the `debugger;` again and observe: we now have what we want, and the logging works properly again!

Delete the `debugger;` inside `onLoginFormSubmit()` before we continue