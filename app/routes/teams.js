import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

const ALL_TEAMS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    order: 2,
    iconUrl: '/assets/img/linkedin.png',
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
    iconUrl: '/assets/img/microsoft.png',
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
    iconUrl: '/assets/img/avengers.jpg',
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
    // if the user user is NOT authenticated
    if (!this.auth.currentUserId) {
      // send them to login
      this.transitionTo('login');
    }
  }

  model() {
    return ALL_TEAMS;
  }
}
