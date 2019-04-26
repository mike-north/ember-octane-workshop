import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

const AUTH_KEY = 'shlack-userid';

export default class AuthService extends Service {
  /**
   * @type {Router}
   */
  @service router;

  @tracked currentUser = null;

  /**
   *
   * @param {string} userId
   */
  async loginWithUserId(userId) {
    window.localStorage.setItem(AUTH_KEY, userId);
    this.router.transitionTo('teams');
  }

  async loadCurrentUser() {
    const { currentUserId } = this;
    if (!currentUserId) return;
    this.currentUser = await (await fetch(
      `/api/users/${currentUserId}`
    )).json();
  }

  get currentUserId() {
    return window.localStorage.getItem(AUTH_KEY);
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
