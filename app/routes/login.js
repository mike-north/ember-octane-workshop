import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class LoginRoute extends Route {
  @service auth;

  async beforeModel() {
    await super.beforeModel(...arguments);
    if (this.auth.currentUserId) {
      this.transitionTo('teams');
    }
  }

  async model() {
    const resp = await fetch('/api/users');
    return await resp.json();
  }
}
