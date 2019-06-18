import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';

const USER_KEY = 'shlack-userid';

export default class AuthService extends Service {
  @service router;

  _getUserId() {
    return window.localStorage.getItem(USER_KEY);
  }
  _setUserId(userId) {
    window.localStorage.setItem(USER_KEY, userId);
  }

  loginWithUserId(userId) {
    this._setUserId(userId);
    this.router.transitionTo('teams');
  }

  get currentUserId() {
    return this._getUserId();
  }

  @action
  logout() {
    this._setUserId('');
    this.router.transitionTo('login');
  }
}
