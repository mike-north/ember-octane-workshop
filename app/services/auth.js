import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import CookiesService from 'ember-cookies/services/cookies';

const TOKEN_NAME = 'shlack-userid-sept';
export default class AuthService extends Service {
  /**
   * @type {import('@ember/routing').Router}
   */
  @service router;
  /**
   * @type {CookiesService}
   */
  @service cookies;

  get _userId() {
    return this.cookies.read(TOKEN_NAME);
  }
  set _userId(userId) {
    this.cookies.write(TOKEN_NAME, userId);
  }

  get currentUserId() {
    return this._userId;
  }

  async handleLogin(userId) {
    // save the userId somewhere
    this._userId = userId;
    // send the user to `/teams`
    this.router.transitionTo('teams');
  }

  @action
  async logout() {
    this._userId = '';
    this.router.transitionTo('login');
  }
}
