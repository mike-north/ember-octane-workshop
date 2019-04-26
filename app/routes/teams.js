import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export const ALL_TEAMS = [
  {
    id: 'li',
    name: 'LinkedIn',
    order: 2,
    iconUrl:
      'https://gravatar.com/avatar/0ca1be2eaded508606982feb9fea8a2b?s=200&d=https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png',
    channels: [
      {
        id: 'general',
        name: 'general',
        description: 'LinkedIn general (professional) chat',
        teamId: 'li',
      },
      {
        id: 'secrets',
        name: 'secrets',
        description: 'professional secrets',
        teamId: 'li',
      },
    ],
  },
  {
    id: 'ms',
    name: 'Microsoft',
    order: 3,
    iconUrl:
      'https://gravatar.com/avatar/0ca1be2eaded508606982feb9fea8a2b?s=200&d=https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png',
    channels: [
      {
        id: 'general',
        name: 'general',
        description: 'Microsoft general chat',
        teamId: 'ms',
      },
      {
        id: 'ie8-gripes',
        name: 'IE8 Gripes',
        description:
          'A place for whining about old browsers',
        teamId: 'ms',
      },
    ],
  },
];

export default class TeamsRoute extends Route {
  /**
   * @type {AuthService}
   */
  @service auth;

  async beforeModel(transition) {
    await super.beforeModel(transition);
    if (!this.auth.isAuthenticated) {
      this.transitionTo('login');
    }
  }

  model() {
    return ALL_TEAMS;
  }
}
