import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

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

  model() {
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
      {
        id: 'avengers',
        name: 'Avengers',
        order: 4,
        iconUrl: '/assets/img/avengers.jpg',
      },
    ];
  }
}
