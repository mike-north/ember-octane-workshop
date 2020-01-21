import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service auth;

  async beforeModel() {
    await super.beforeModel(...arguments);
    if (this.auth.currentUserId) {
      // logged in
      this.transitionTo('teams');
    } else {
      this.transitionTo('login');
    }
  }
}
