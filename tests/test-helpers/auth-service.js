import Service, { inject as service } from '@ember/service';
import { Router } from '@ember/routing';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StubbedAuthService extends Service {
  /**
   * @type {Router}
   */
  @service router;

  @tracked currentUser = null;

  get isAuthenticated() {
    return !!StubbedAuthService.authenticatedUserId;
  }

  async loadCurrentUser() {
    if (!this.isAuthenticated) return;
    this.currentUser = {
      id: StubbedAuthService.authenticatedUserId,
      name: 'Mike North'
    };
  }

  loginWithUserId(id) {
    StubbedAuthService.authenticatedUserId = id;
    this.router.transitionTo('teams');
  }

  @action
  logout() {
    StubbedAuthService.authenticatedUserId = null;
    this.currentUser = null;
    this.router.transitionTo('login');
  }

  static authenticatedUserId = null;
}
