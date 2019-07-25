import Component from '@glimmer/component';
import { action } from '@ember/object';
import { sum } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class LoginFormComponent extends Component {
  @tracked userId = null;
  
  /**
   * @type {AuthService}
   */
  @service auth;

  @sum('myList') mySum;

  handleLogin() {
    console.log('userId=', this.userId);
    this.auth.loginWithUserId(this.userId);
  }
  get isDisabled() {
    return !this.userId;
  }

  @action
  onLoginFormSubmit(evt) {
    evt.preventDefault();
    if (this.isDisabled) return;
    this.handleLogin();
  }

  @action
  onSelectChanged(evt) {
    this.userId = evt.target.value;
  }
}
