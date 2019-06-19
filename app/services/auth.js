import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';

const USER_KEY = 'shlack-userid';

export default class AuthService extends Service {
  @service router;

  @tracked currentUser = null;

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

  async loadCurrentUser() {
    const { currentUserId } = this;
    if (!currentUserId) return;
    const userResp = await fetch(`/api/users/${currentUserId}`);
    this.currentUser = await userResp.json();
    return this.currentUser;
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
