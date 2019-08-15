import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import CookiesService from 'ember-cookies/services/cookies';

const USER_ID_KEY = 'shlack-user-id';

export default class AuthService extends Service {
  @service router;
  /**
   * @type {CookiesService}
   */
  @service cookies;

  get currentUserId() {
    return this._readUserId();
  }

  _writeUserId(userId) {
    this.cookies.write(USER_ID_KEY, userId);
  }
  _readUserId() {
    return this.cookies.read(USER_ID_KEY);
  }

  loginWithUserId(userId) {
    this._writeUserId(userId);
    this.router.transitionTo('teams');
  }

  @action
  logout(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this._writeUserId('');
    this.router.transitionTo('login');
  }
}
