import Service, { inject as service } from '@ember/service';
import { Router } from '@ember/routing';
import { action } from '@ember/object';

export default class StubbedAuthService extends Service {
  /**
   * @type {Router}
   */
  @service router;

  get isAuthenticated() {
    return !!StubbedAuthService.authenticatedUserId;
  }

  loginWithUserId(id) {
    StubbedAuthService.authenticatedUserId = id;
    this.router.transitionTo('teams');
  }

  @action
  logout() {
    StubbedAuthService.authenticatedUserId = null;
    this.router.transitionTo('login');
  }

  static authenticatedUserId = null;
}
