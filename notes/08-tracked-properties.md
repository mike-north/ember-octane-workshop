# Tracked Properties & Derived State

Ember Octane's `tracked` property system allows us to decorate our lowest-level mutable state, and then (for the most part) treat anything downstream as if it's regular modern JavaScript.

Let's use tracked properties to enhance our login form in the following ways:

- We should have a class field `userId` that's kept in sync with the `<select>`'s valuee
  - The example validation message should be replaced with `"Logging in with userId {{this.userId}}"`, and should only be displayed if/when a valid `userId` is present
- We should have an `isDisabled` field that indicates whether the form has an invalid `userId` or not
  - The `input[type="submit"]` should be disabled whenever `isDisabled` is true
  - `onLoginFormSubmit` should only call `handleSignIn` if `isDisabled` is false
- Minimal updates to tests if any of them break (we'll do more meaningful testing next)

Let's get started!

First, we'll need to import the `@tracked` decorator

```js
import { tracked } from '@glimmer/tracking';
```

Next, add the userId class field, and initialize it to `null`

```js
/**
 * @type {string}
 */
userId = null;
```
