import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class LoginFormComponent extends Component {
  @tracked
  userId = null;

  /**
   * @type {AuthService}
   */
  @service auth;
  performLogin(userId) {
    this.auth.loginWithUserId(userId);
  }
  @action
  handleSubmit(evt) {
    evt.preventDefault();
    this.performLogin(this.userId);
  }
  @action
  handleUserSelect(evt) {
    this.userId = evt.target.value;
  }
  get isDisabled() {
    return !this.userId;
  }
}
