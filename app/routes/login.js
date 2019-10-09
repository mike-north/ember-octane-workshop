import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service auth;
  @service router;
  async beforeModel() {
    await super.beforeModel(); // parent work
    if (this.auth.currentUserId) {
      this.router.transitionTo('teams');
    }
  }
}
