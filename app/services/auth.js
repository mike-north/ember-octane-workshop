import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';

const USER_ID_KEY = 'shlack-user-id';

export default class AuthService extends Service {
  @service router;

  get currentUserId() {
    return this._readUserId();
  }

  _writeUserId(userId) {
    window.localStorage.setItem(USER_ID_KEY, userId);
  }
  _readUserId() {
    return window.localStorage.getItem(USER_ID_KEY);
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
