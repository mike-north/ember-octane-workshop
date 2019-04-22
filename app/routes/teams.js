import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class TeamRoute extends Route {
  @service auth;

  beforeModel(transition) {
    if (!this.auth.isAuthenticated) {
      this.auth.prevTransition = transition;
      this.transitionTo('login');
    }
  }
  async model() {
    const teamResponse = fetch('/api/teams');
    return (await teamResponse).json();
  }
}
