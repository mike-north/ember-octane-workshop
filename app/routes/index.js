import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class IndexRoute extends Route {
  /**
   * @type {AuthService}
   */
  @service auth;

  beforeModel() {
    super.beforeModel(...arguments);
    if (this.auth.isAuthenticated) {
      this.transitionTo('teams');
    } else {
      this.transitionTo('login');
    }
  }
}
