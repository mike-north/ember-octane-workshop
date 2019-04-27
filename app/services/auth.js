import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import CookiesService from 'ember-cookies/services/cookies';

const AUTH_KEY = 'shlack-userid';

export default class AuthService extends Service {
  /**
   * @type {Router}
   */
  @service router;

  /**
   * @type {CookiesService}
   */
  @service cookies;

  @tracked currentUser = null;

  /**
   *
   * @param {string} userId
   */
  async loginWithUserId(userId) {
    this.cookies.write(AUTH_KEY, userId);
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
    return this.cookies.read(AUTH_KEY);
  }

  get isAuthenticated() {
    return !!this.currentUserId;
  }

  @action
  logout() {
    this.cookies.write(AUTH_KEY, null);
    this.router.transitionTo('login');
  }
}
