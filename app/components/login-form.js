import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginFormComponent extends Component {
  /**
   * @type {string}
   */
  @tracked userId = null;

  get isDisabled() {
    return !this.userId;
  }

  /**
   * Handle change events on the <select>
   * @param {Event & { target: HTMLSelectElement }} evt
   */
  @action
  onSelectChanged(evt) {
    this.userId = evt.target.value;
  }

  handleSignIn(value) {
    console.log(value);
  }

  /**
   * Handle the form submit event
   * @param {Event & { target: HTMLFormElement }} evt
   */
  @action
  onLoginFormSubmit(evt) {
    evt.preventDefault();
    if (this.userId) this.handleSignIn(this.userId);
  }
}
