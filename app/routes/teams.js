import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeamsRoute extends Route {
  @service auth;
  @service router;
  async beforeModel() {
    await super.beforeModel(); // parent work
    if (!this.auth.currentUserId) {
      // send the user to the login screen
      this.router.transitionTo('login');
      return;
    }
    await this.auth.fetchUserRecord(); // my work
  }
  // "fetch data from my API"
  async model() {
    return [
      {
        id: 'linkedin',
        name: 'LinkedIn',
        order: 2,
        iconUrl: '/assets/img/linkedin.png',
      },
      {
        id: 'ms',
        name: 'Microsoft',
        order: 3,
        iconUrl: '/assets/img/microsoft.png',
      },
    ];
  }
}
