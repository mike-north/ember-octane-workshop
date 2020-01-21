# Our First Acceptance Test

Good acceptance tests imitate using your app the way a user would. For browsers, this means your tests should be expressed in terms of a sequence of things like

- Visit a URL
- Click on a button
- Observe that something is/isn't on the screen
- Fill in a text field
- Press a keyboard key

If you find yourself wanting to do things that a user can't do -- that's a sign that you may be diverging from the territory of acceptance tests.

Ember provides fantastic support for these kinds of tests out of the box. New apps include support for [QUnit](https://qunitjs.com) by default (via the [`ember-qunit`](https://github.com/emberjs/ember-qunit)), but you can swap it out for [Mocha](https://mochajs.org/) (via [`ember-mocha`](https://github.com/emberjs/ember-mocha)) in about a minute.

<hr>
<p>
  <blockquote>
    <h3>
      💡 Mike's Tip: Choosing a Test Framework
    </h3>
    <a href="https://github.com/mike-north">
      <img src="https://github.com/mike-north.png" height=64 align="left" style="margin-right: 10px" />
    </a>
    <p>
      I prefer QUnit because it'll try to run through all of your tests even if something throws an exception. Mocha's tests pass/fail based on exceptions, so one bad failing assertion at the beginning of a test causes it to exit early, so subsequent assertions will never run at all!
    </p>
  </blockquote>
</p>
<hr>

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

    await click('.team-sidebar__logout-button'); // Click a button

    assert.equal(currentURL(), '/login'); // Make sure we're now at /login
  });
});
```

and now go to http://localhost:4200/tests. Try adding a `debugger;` to various places within this test (i.e., between `await`s). What do you notice?

[Ember's test helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md) can do a lot more, and are built with using `async`/`await` in mind.
