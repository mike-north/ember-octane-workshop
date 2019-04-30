import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class LoginFormComponent extends Component {
  /**
   * @type {string}
   */
  @tracked userId = null;

  /**
   * @type {AuthService}
   */
  @service auth;

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
    if (typeof value === 'string' && value.length > 0)
      this.auth.loginWithUserId(value);
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
