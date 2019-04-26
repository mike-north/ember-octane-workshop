import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class LoginFormComponent extends Component {
  /**
   * @type {AuthService}
   */
  @service auth;

  handleSignIn(value) {
    if (typeof value === 'string' && value.length > 0)
      this.auth.loginWithUserId(value);
  }

  /**
   * Handle the form submit event
   * @param {Event} evt
   */
  @action
  onLoginFormSubmit(evt /* DOM event */) {
    evt.preventDefault();
    this.handleSignIn(evt.target.querySelector('select').value);
  }
}
