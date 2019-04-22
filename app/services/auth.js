import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

const USER_LOCALSTORAGE_KEY = 'shlack-userid';

export default class AuthService extends Service {
  @tracked
  currentUser = null;

  @tracked
  prevTransition = null;

  @service router;
  @service cookies;

  async restoreSession() {
    const userId = this.cookies.read(USER_LOCALSTORAGE_KEY);
    if (userId) {
      const resp = await fetch(`/api/users/${userId}`);
      if (!resp.ok) {
        await this.clearSession();
        throw new Error('Problem retriving user to restore session');
      }
      this.currentUser = await resp.json();
    }
  }

  get isAuthenticated() {
    return !!this.currentUser;
  }

  async clearSession() {
    this.cookies.clear(USER_LOCALSTORAGE_KEY);
    this.currentUser = null;
    if (window && window.navigator && window.navigator.serviceWorker) {
      await (await window.navigator.serviceWorker.getRegistration()).unregister();
    }
  }

  async loginWithUserId(uid) {
    this.cookies.write(USER_LOCALSTORAGE_KEY, uid);
    await this.restoreSession();
    if (this.prevTransition) {
      this.prevTransition.retry();
    } else {
      this.router.transitionTo('teams.index');
    }
  }
}
