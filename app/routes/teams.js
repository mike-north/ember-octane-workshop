import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

const ALL_TEAMS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    order: 2,
    iconUrl:
      'https://gravatar.com/avatar/0ca1be2eaded508606982feb9fea8a2b?s=200&d=https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png',
    channels: [
      {
        id: 'recruiting',
        name: 'recruiting',
        description:
          'The Next Generation Of Recruiting. Find top talents today!',
        teamId: 'linkedin',
      },
      {
        id: 'jobs',
        name: 'Job hunting',
        description: 'Discover companies that fit you.',
        teamId: 'linkedin',
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
        id: 'recruiting',
        name: 'recruiting',
        description:
          'The Next Generation Of Recruiting. Find top talents today!',
        teamId: 'linkedin',
      },
      {
        id: 'jobs',
        name: 'Job hunting',
        description: 'Discover companies that fit you.',
        teamId: 'linkedin',
      },
    ],
  },
  {
    id: 'avengers',
    name: 'Avengers',
    order: 4,
    iconUrl:
      'https://pbs.twimg.com/profile_images/1113336188956434432/7XUkmgrG_400x400.jpg',
    channels: [
      {
        id: 'recruiting',
        name: 'recruiting',
        description:
          'The Next Generation Of Recruiting. Find top talents today!',
        teamId: 'linkedin',
      },
      {
        id: 'jobs',
        name: 'Job hunting',
        description: 'Discover companies that fit you.',
        teamId: 'linkedin',
      },
    ],
  },
];

export default class TeamsRoute extends Route {
  @service auth;
  async beforeModel(transition) {
    await super.beforeModel(transition);
    if (!this.auth.currentUserId) {
      this.transitionTo('login');
    }
  }
  model() {
    return ALL_TEAMS;
  }
}
