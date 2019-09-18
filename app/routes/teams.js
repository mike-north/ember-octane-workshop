import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeamsRoute extends Route {
  @service auth;

  async beforeModel(transition) {
    await super.beforeModel(transition);
    // if the user NOT logged in
    if (!this.auth.currentUserId) {
      // send them to the login page
      this.transitionTo('login');
    }
  }
  // model - fetching data
}
