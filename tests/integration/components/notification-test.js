import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | notification', function(
  hooks
) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('notificationData', {
      body: 'Operation successful!',
    });
    await render(
      hbs`<Notification @notification={{this.notificationData}}/>`
    );

    assert.equal(
      ('' + this.element.textContent).trim(),
      'Operation successful!'
    );
  });
});
