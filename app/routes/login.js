import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class LoginRoute extends Route {
  @service auth;
  @service router;
  async beforeModel() {
    await super.beforeModel(); // parent work
    if (this.auth.currentUserId) {
      this.router.transitionTo('teams');
    }
  }
  async model() {
    return await (await fetch('/api/users')).json();
  }
}
