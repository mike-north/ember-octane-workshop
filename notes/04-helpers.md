# Helpers

Helpers are like simple functions that can be used in templates. Let's create a simple one to allow us to render the current time (as a number in our HTML).

We can use Ember CLI to generate a starting point for our helper, as well as an integration test.

```sh
ember generate helper current-time
```

- [`app/helpers/current-time.js`](../app/helpers/current-time.js) - the helper
- [`tests/integration/helpers/current-time-test.js`](../tests/integration/helpers/current-time-test.js) - a passing integration test

## Implementing the `{{current-time}}` Helper

The helper ([`app/helpers/current-time.js`](../app/helpers/current-time.js)) should return the UTC-stringified value of `new Date()`

```js
import { helper } from '@ember/component/helper';

export default helper(function currentTime() {
  return new Date(date).toUTCString();
});
```

Now in [`app/templates/application.hbs`](../app/templates/application.hbs) use our new helper to render this date to the screen

```hbs
<TeamSelector />
<TeamSidebar />
<main class="flex-1 flex flex-col bg-white overflow-hidden">
  {{current-time}} {{! <---- add this }}
  <ChannelHeader @title="compliments" @description="Say nice things about your teammates" />
```

Now you should see the number showing up in the channel header area

![channel-header-image](./img/04-helpers/now-in-header.png)

Refreshing the page should cause the number to change. Congrats! **we've just added our first piece of dynamic data to a template!**

### Integration test for the `{{current-time}}` helper

open [`tests/integration/helpers/current-time-test.js`](../tests/integration/helpers/current-time-test.js) so we can work on writing an integration test for the `{{current-time}}` helper

These tests take the form of setting up a scenario using a small piece of handlebars, and then making assertions against `this.element`.

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | current-time', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputValue', '1234'); // creating a value outside the helper

    await render(hbs`{{current-time inputValue}}`); // passing it into the helper

    assert.equal(this.element.textContent.trim(), '1234'); // asserting that everything looks right
  });
});
```

You can view the current state of the tests by visiting http://localhost:4200/tests?hidepassed. Note that the `{{current-time}}` test is failing

This is going to be a really hard test to write. We have a few bad options (stubbing `Date.now`) but let's not go there. How about passing the helper an argument

Update [`app/helpers/current-time.js`](../app/helpers/current-time.js)

```js
import { helper } from '@ember/component/helper';

export default helper(function currentTime([date = new Date()]) {
  return new Date(date).toUTCString();
});
```

so we can now do something like `{{current-time this.myDate}}` if we want to use a specific date instead of always using `now`. Used normally, it works exactly the same as before, but now the test gets much easier

[`tests/integration/helpers/current-time-test.js`](../tests/integration/helpers/current-time-test.js)

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | current-time', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('myDate', new Date('01-02-2019'));

    await render(hbs`{{current-time this.myDate}}`);

    assert.equal(
      this.element.textContent.trim(),
      'Wed, 02 Jan 2019 08:00:00 GMT'
    );
  });
});
```

## The `{{format-timestamp}}` helper

Let's build a helper that takes a date string

```hbs
{{format-timestamp "01-01-2019"}}
```

and returns a string like

```
Jan 1, 2019 00:00.00 PM
```

Something like [Moment.js](http://momentjs.com/) can do this, but is overkill for just this one thing

Let's write an integration test too!
