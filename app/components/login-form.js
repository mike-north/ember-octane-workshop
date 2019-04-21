import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginFormComponent extends Component {
  @service auth;

  @tracked
  userId = null;

  @tracked
  previewUser = null;

  get previewUserUrl() {
    if (!this.userId) return null;
    return `/api/users/${this.userId}`;
  }

  get previewUserPromise() {
    this.previewUser = null;
    if (!this.previewUserUrl) return null;
    return fetch(this.previewUserUrl)
      .then(resp => resp.json())
      .then(data => {
        this.previewUser = data;
        return data;
      });
  }

  get isInvalid() {
    return !this.previewUser;
  }

  @action
  async onFormSubmitted() {
    await this.auth.loginWithUserId(this.userId);
  }
}
