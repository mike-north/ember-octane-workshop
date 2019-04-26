import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router';
import { action } from '@ember/object';

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
    this.currentUserId = userId;
  }

  get currentUserId() {
    return window.localStorage.getItem(AUTH_KEY);
  }
  set currentUserId(id) {
    window.localStorage.setItem(AUTH_KEY, id);
  }

  get isAuthenticated() {
    return !!this.currentUserId;
  }

  @action
  logout() {
    window.localStorage.removeItem(AUTH_KEY);
    this.router.transitionTo('login');
  }
}
