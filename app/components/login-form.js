import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginFormComponent extends Component {
  @tracked
  userId = null;

  get isDisabled() {
    return !this.userId;
  }

  handleLogin(userId) {
    console.log('logging in as ', userId);
    this.userId = null;
  }

  @action
  onSelectChanged(evt) {
    const { value } = evt.target;
    this.userId = value;
  }
  @action
  onLoginFormSubmit(evt) {
    evt.preventDefault();
    const { value } = evt.target.querySelector('select');
    if (value) this.handleLogin(value);
  }
}
