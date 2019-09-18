import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service auth;
  async beforeModel(transition) {
    await super.beforeModel(transition);
    // if the user is authenticated
    if (this.auth.currentUserId) {
      // send them to the chat UI
      this.transitionTo('teams');
    } else {
      // otherwise
      // send them to the login screen
      this.transitionTo('login');
    }
  }
}
