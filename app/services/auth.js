import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const USER_LOCALSTORAGE_KEY = 'shlack-userid';

export default class AuthService extends Service {
  @tracked
  currentUser = null;

  async restoreSession() {
    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (userId) {
      const resp = await fetch(`/api/users/${userId}`);
      if (!resp.ok) {
        this.clearSession();
        throw new Error('Problem retriving user to restore session');
      }
      this.currentUser = await resp.json();
    }
  }

  get isAuthenticated() {
    return !!this.currentUser;
  }

  clearSession() {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    this.currentUser = null;
  }

  async loginWithUserId(uid) {
    localStorage.setItem(USER_LOCALSTORAGE_KEY, uid);
    await this.restoreSession();
  }
}
