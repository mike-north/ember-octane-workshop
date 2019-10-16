import Service, { inject as service } from '@ember/service';
import fetch from 'fetch';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const USER_ID_TOKEN = 'slack-user-id-china';

export default class AuthService extends Service {
  myValue = 'foo';

  /**
   * @type {import('@ember/routing').Router}
   */
  @service router;

  // current user id
  get currentUserId() {
    return this._readUserId();
  }

  // record for the current user
  @tracked
  currentUser = null;

  // "logging in"
  async login(userId) {
    if (this.currentUserId) throw new Error('Already logged in!');
    this._writeUserId(userId);
    await this.loadUser(userId);
    this.router.transitionTo('teams');
  }

  async _loadUserImpl(uid) {
    let userResp;
    try {
      userResp = await fetch('/api/users/' + uid);
    } catch (err) {
      throw new Error('Could not connect to API');
    }
    if (!userResp) return;
    const bodyTxt = await userResp.text();
    try {
      this.currentUser = JSON.parse(bodyTxt);
    } catch (err) {
      throw new Error(
        'Could not parse user record payload into JSON: ' +
          JSON.stringify({
            status: userResp.status,
            statusText: userResp.statusText,
            body: bodyTxt,
          })
      );
    }
  }
  async loadUser() {
    this._loadUserImpl(this.currentUserId);
  }

  // "logging out"
  @action
  logout() {
    if (!this.currentUserId) throw new Error('Already logged out!');
    this._writeUserId('');
    this.currentUser = null;
    this.router.transitionTo('login');
  }

  // storing the user id somewhere
  _readUserId() {
    return window.localStorage.getItem(USER_ID_TOKEN);
  }
  _writeUserId(uid) {
    window.localStorage.setItem(USER_ID_TOKEN, uid);
  }
}
