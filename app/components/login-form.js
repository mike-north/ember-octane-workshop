import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginFormComponent extends Component {
  @tracked userId;

  @service auth;

  handleSignIn() {
    this.auth.loginWithUserId(this.userId);
  }
  get isDisabled() {
    return !this.userId;
  }
  get messageText() {
    return `user: ${this.userId}`;
  }

  @action
  onSelectChanged(evt) {
    this.userId = evt.target.value;
  }

  @action
  onLoginFormSubmit(evt) {
    evt.preventDefault();
    if (this.userId) {
      this.handleSignIn();
    }
  }
}
