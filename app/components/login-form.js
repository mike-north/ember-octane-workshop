import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginFormComponent extends Component {
  @tracked
  userId = null;

  @service
  auth;

  get isDisabled() {
    return !this.userId;
  }

  @action
  onSelectChanged(evt) {
    const { value } = evt.target;
    this.userId = value;
  }
  @action
  async onLoginFormSubmit(evt) {
    evt.preventDefault();
    const { value } = evt.target.querySelector('select');
    if (value) await this.auth.handleLogin(value);
  }
}
