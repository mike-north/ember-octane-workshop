import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoginRoute extends Route {
  @tracked userId = null;

  @service auth;

  @action
  async doLogin() {
    await this.auth.loginWithUserId(1);
  }
}
