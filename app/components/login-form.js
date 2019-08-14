import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginFormComponent extends Component {
  @tracked userId;

  handleSignIn() {
    console.log('Logging in as ', this.userId);
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
