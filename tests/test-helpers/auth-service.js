import Service, { inject as service } from '@ember/service';
import Router from '@ember/routing/router';
import { tracked } from '@glimmer/tracking';

export default class StubbedAuthService extends Service {
  /**
   * @type {Router}
   */
  @service router;
  /**
   * @type {string}
   */
  @tracked currentUserId = null;

  get isAuthenticated() {
    return !!this.currentUserId;
  }

  loginWithUserId(id) {
    this.currentUserId = id;
    this.router.transitionTo('teams');
  }
}
