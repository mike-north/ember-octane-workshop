import Route from '@ember/routing/route';

export default class TeamsTeamRoute extends Route {
  model() {
    return {
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
        {
          id: 'tbt',
          name: 'throw back thursday',
          description: 'Remember the good old days? yay, us too.',
          teamId: 'ms',
        },
      ],
    };
  }
}
