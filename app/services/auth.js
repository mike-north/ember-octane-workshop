import Service, { inject as service } from '@ember/service';
import Router from '@ember/routing/router';
import { action } from '@ember/object';

const USER_ID_KEY = 'shlack-userid';

export default class AuthService extends Service {
  /**
   * @type {Router}
   */
  @service router;

  _writeUserId(userId) {
    window.localStorage.setItem(USER_ID_KEY, userId);
  }
  _readUserID() {
    return window.localStorage.getItem(USER_ID_KEY);
  }

  get currentUserId() {
    return this._readUserID();
  }

  loginWithUserId(userId) {
    this._writeUserId(userId);
    this.router.transitionTo('teams');
  }

  @action
  logout(evt) {
    if (evt) { evt.preventDefault(); }
    this._writeUserId('');
    this.router.transitionTo('login');
  }
}
