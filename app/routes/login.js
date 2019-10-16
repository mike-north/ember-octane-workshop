import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service auth;

  async beforeModel() {
    await super.beforeModel(...arguments);
    if (this.auth.currentUserId) {
      this.transitionTo('teams');
    }
  }
}
