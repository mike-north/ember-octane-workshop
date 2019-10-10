import Route from '@ember/routing/route';

export default class TeamsTeamChannelRoute extends Route {
  async model() {
    return {
      id: 'recruiting',
      name: 'recruiting',
      description: 'The Next Generation Of Recruiting. Find top talents today!',
      teamId: 'linkedin',
    };
  }
}
