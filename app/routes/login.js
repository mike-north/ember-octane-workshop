import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service auth;

  beforeModel() {
    super.beforeModel(...arguments);
    if (this.auth.isAuthenticated) {
      this.transitionTo('teams.index');
    }
  }
}
