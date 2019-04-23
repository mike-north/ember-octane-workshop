import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginFormComponent extends Component {
  @service auth;

  @tracked
  userId = null;

  get previewUser() {
    if (!this.userId) return null;
    const [found] = this.args.users.filter(u => u.id === this.userId);
    if (!found) return null;
    return found;
  }

  get isInvalid() {
    return !this.userId;
  }

  @action
  async onFormSubmitted() {
    await this.auth.loginWithUserId(this.userId);
  }
}
