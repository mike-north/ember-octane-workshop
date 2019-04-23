import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class LoginFormComponent extends Component {
  @service auth;

  @tracked
  userId = null;

  @tracked
  previewUser = null;

  @tracked
  users = [];

  constructor() {
    super(...arguments);
    this.loadUsers();
  }

  async loadUsers() {
    this.users = await (await fetch('/api/users')).json();
  }

  get previewUserUrl() {
    if (!this.userId) return null;
    return `/api/users/${this.userId}`;
  }

  get previewUserPromise() {
    this.previewUser = null;
    if (!this.previewUserUrl) return null;
    return fetch(this.previewUserUrl)
      .then(resp => resp.json())
      .then(data => {
        this.previewUser = data;
        return data;
      });
  }

  get isInvalid() {
    return !this.userId;
  }

  get userId() {
    return this.userId;
  }

  @action
  async onFormSubmitted() {
    await this.auth.loginWithUserId(this.userId);
  }
}
