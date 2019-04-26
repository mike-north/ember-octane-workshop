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
    this._writeUserId(userId);
    this.router.transitionTo('teams');
  }

  get currentUserId() {
    return this._readUserId();
  }

  get isAuthenticated() {
    return !!this.currentUserId;
  }

  @action
  logout() {
    this._writeUserId(null);
    this.router.transitionTo('login');
  }

  _readUserId() {
    return window.localStorage.getItem(AUTH_KEY);
  }
  _writeUserId(userId) {
    window.localStorage.setItem(AUTH_KEY, userId);
  }
}
