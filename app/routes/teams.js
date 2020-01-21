import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';
import fetch from 'fetch';

export default class TeamsRoute extends Route {
  /**
   * @type {AuthService}
   */
  @service auth;

  async beforeModel() {
    await super.beforeModel(...arguments);
    if (!this.auth.currentUserId) {
      this.transitionTo('login');
      return;
    }
    // we know we are logged in by this line
    await this.auth.loadUser();
  }

  async model() {
    const resp = await fetch('/api/teams');
    return await resp.json();
  }
}
