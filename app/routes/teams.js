import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeamRoute extends Route {
  @service auth;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.transitionTo('login');
    }
  }
  async model() {
    const teamResponse = fetch('http://localhost:4200/api/teams');
    return (await teamResponse).json();
  }
}
