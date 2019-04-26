# Our First Acceptance Test

Good acceptance tests imitate using your software the way a user would. For browsers, this means your tests should be expressed in terms of a sequence of things like

- Visit a URL
- Click on a button
- Observe that something is/isn't on the screen
- Fill in a text field
- Press a keyboard key

If you find yourself wanting to do things that a user can't do -- that's a sign that you may be diverging from the territory of acceptance tests.

Ember provides fantastic support for these kinds of tests, right out of the box. [QUnit](https://qunitjs.com) is what you get by default (via the [`ember-qunit`](https://github.com/emberjs/ember-qunit)), but you can swap it out for [Mocha](https://mochajs.org/) (via [`ember-mocha`](https://github.com/emberjs/ember-mocha)) in about a minute.

To generate an acceptance test, run

```sh
ember g acceptance-test logout
```

You should see some feedback that a new test file was created [`tests/acceptance/logout-test.js`](../tests/acceptance/logout-test.js)

Replace the test code with this

```js
import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /teams', async function(assert) {
    await visit('/teams'); // Go to a URL

    assert.equal(currentURL(), '/teams'); // Make sure we've arrived

    await click('.logout-button'); // Click a button

    assert.equal(currentURL(), '/login'); // Make sure we're now at /login
  });
});
```

and now go to http://localhost:4200/tests. Try adding a `debugger;` to various places within this test (i.e., between `await`s). What do you notice?
