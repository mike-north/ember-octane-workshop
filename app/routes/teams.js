import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class TeamsRoute extends Route {
  @service auth;
  async beforeModel(transition) {
    await super.beforeModel(transition);
    if (!this.auth.currentUserId) {
      // not logged in
      this.transitionTo('login');
    } else {
      // logged in
      return this.auth.loadCurrentUser();
    }
  }
  async model() {
    const resp = await fetch('/api/teams');
    return resp.json();
  }
}
