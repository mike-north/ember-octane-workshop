import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service auth;

  async beforeModel(transition) {
    await super.beforeModel(transition);
    // if the user is already logged in
    if (this.auth.currentUserId) {
      // send them to the chat UI
      this.transitionTo('teams');
    }
  }
  // model - fetching data
}
