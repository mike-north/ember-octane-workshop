import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router';

const AUTH_KEY = 'shlack-userid';

export default class AuthService extends Service {
  /**
   * @type {Router}
   */
  @service router;

  /**
   *
   * @param {string} userId
   */
  loginWithUserId(userId) {
    this.router.transitionTo('teams');
    window.localStorage.setItem(AUTH_KEY, userId);
  }

  get currentUserId() {
    return window.localStorage.getItem(AUTH_KEY);
  }

  get isAuthenticated() {
    return !!this.currentUserId;
  }

  logout() {
    window.localStorage.removeItem(AUTH_KEY);
    this.router.transitionTo('login');
  }
}
