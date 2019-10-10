import Service from '@ember/service';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import CookiesService from 'ember-cookies/services/cookies';

const USER_ID_KEY = 'slack-userid-09';

export default class AuthService extends Service {
  @service router;
  /**
   * @type {CookiesService}
   */
  @service cookies;

  // current user id
  _readUserId() {
    return this.cookies.read(USER_ID_KEY);
  }
  _writeUserId(uid) {
    this.cookies.write(USER_ID_KEY, uid);
  }
  get currentUserId() {
    return this._readUserId();
  }

  @tracked
  user = null;

  // login with user id
  async loginWithUserId(userId) {
    // store the user id
    this._writeUserId(userId);
    await this.fetchUserRecord();
    // send the user to the "logged in" experience
    this.router.transitionTo('teams');
  }

  async fetchUserRecord() {
    // fetch the user's record
    const resp = await fetch(`/api/users/${this.currentUserId}`);
    this.user = await resp.json();
  }

  // logout
  @action
  async logout() {
    this._writeUserId('');
    this.user = null;
    this.router.transitionTo('login');
  }
}
