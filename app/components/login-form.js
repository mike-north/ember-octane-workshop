import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class LoginFormModel {
  @tracked
  currentId = null;
}

let ct = 0;
export default class LoginFormComponent extends Component {
  model = new LoginFormModel();

  get isDisabled() {
    console.log('isDisabled ', ct++);
    return !this.model.currentId;
  }

  doLogin(userId) {
    console.log(`Logging in as user (${userId})`);
  }

  @action
  handleUserSelectionChange(evt) {
    const userId = evt.target.value;
    this.model.currentId = userId;
  }

  @action
  handleSubmit(evt) {
    evt.preventDefault();
    this.doLogin(1);
  }
}
