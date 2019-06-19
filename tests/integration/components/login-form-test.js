import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('initial render sanity test', async function(assert) {
    this.set('users', [
      {
        id: 10,
        name: 'Dilbert',
        username: 'dilbert',
        iconUrl:
          'https://pbs.twimg.com/profile_images/631245346379689984/GqseXcd4_400x400.jpg',
      },
    ]);
    await render(hbs`<LoginForm @users={{this.users}}/>`);

    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/\s*\n+\s*/g, '\n')
        .split('\n'),
      ['Select a user', 'Dilbert', 'A validation message']
    );
  });

  test('initially no user selected, and "sign in" button disabled', async function(assert) {
    this.set('users', [
      {
        id: 10,
        name: 'Dilbert',
        username: 'dilbert',
        iconUrl:
          'https://pbs.twimg.com/profile_images/631245346379689984/GqseXcd4_400x400.jpg',
      },
    ]);
    await render(hbs`<LoginForm @users={{this.users}}/>`);

    const select = find('select[data-testid="user-select"]');
    const button = find('input[type="submit"]');
    // @ts-ignore
    assert.equal(select.value, '', '<select> for user is initially empty');
    // @ts-ignore
    assert.equal(button.disabled, true, 'button is initially disabled');
  });

  test("after selecting a user, the 'sign in' button is enabled", async function(assert) {
    this.set('users', [
      {
        id: 10,
        name: 'Dilbert',
        username: 'dilbert',
        iconUrl:
          'https://pbs.twimg.com/profile_images/631245346379689984/GqseXcd4_400x400.jpg',
      },
    ]);
    await render(hbs`<LoginForm @users={{this.users}}/>`);

    const button = find('input[type="submit"]');

    // @ts-ignore
    assert.equal(button.disabled, true, 'button is initially disabled');
    await fillIn('select[data-testid="user-select"]', '10');

    // @ts-ignore
    assert.equal(button.disabled, false, 'button is now enabled');
  });
});
