import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginFormComponent extends Component {
  @tracked userId = null;

  @service auth;

  get isDisabled() {
    return !this.userId;
  }

  @action
  onSelectChanged(evt) {
    this.userId = evt.target.value;
  }

  @action
  onLoginFormSubmit(evt) {
    evt.preventDefault();
    if (!this.userId) return;
    this.auth.loginWithUserId(this.userId);
  }
}
