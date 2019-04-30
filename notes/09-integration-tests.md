# Integration Tests

As we saw when writing tests for our `{{format-timestamp}}` helper, integration tests in ember involve setting up a scenario with handlebars, rendering it, and then making assertions against the rendered HTML.

Our `<LoginForm />` component has become complicated enough that we should write some meaningful tests for it.

For our learning purposes, we'll just worry about two scenarios

- When the component is initially rendered, no user is selected, and the `input[type="submit"]` is disabled
- Once a user is chosen, the `input[type="submit"]` is enabled, and the `<select>` should have a value of the appropriate user's id
