import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class MyActionHandler {
  @tracked
  userId = null;

  @action
  handleSubmit(evt) {
    evt.preventDefault();
    this.isDisabled = true;
    this.performLogin(this.userId);
  }
  @action
  handleUserSelect(evt) {
    this.userId = evt.target.value;
  }
}

export default class LoginFormComponent extends Component {
  handler = new MyActionHandler();
  performLogin(userId) {
    // later
    console.log('Trying to log in: ' + userId);
  }

  get isDisabled() {
    return !this.handler.userId;
  }
}
