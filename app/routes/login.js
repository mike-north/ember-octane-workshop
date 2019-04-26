import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class LoginRoute extends Route {
  /**
   * @type {AuthService}
   */
  @service auth;

  async beforeModel() {
    await super.beforeModel(...arguments);
    if (this.auth.isAuthenticated) {
      this.transitionTo('teams');
    }
  }
}
