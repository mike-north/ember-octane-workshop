import Route from '@ember/routing/route';
import fetch from 'fetch';

import { inject as service } from '@ember/service';

export default class TeamsRoute extends Route {
  @service auth;
  async beforeModel(transition) {
    await super.beforeModel(transition);
    if (!this.auth.currentUserId) {
      this.transitionTo('login');
    }
  }

  async model() {
    const resp = await fetch('/api/teams');
    return await resp.json();
  }
}
