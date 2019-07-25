import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class TeamsRoute extends Route {
  @service auth;

  async beforeModel(transition) {
    await super.beforeModel(transition);
    // if the user user is NOT authenticated
    if (!this.auth.currentUserId) {
      // send them to login
      this.transitionTo('login');
    }
  }

  async model() {
    const resp = await fetch('/api/teams');
    if (!resp.ok) {
      throw new Error('Problem requesting teams');
    }
    return await resp.json();
  }
}
