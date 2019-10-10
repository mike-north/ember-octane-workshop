import Route from '@ember/routing/route';

export default class TeamsTeamChannelRoute extends Route {
  async model({ channelId }) {
    const parentModel = this.modelFor('teams.team');
    const matches = parentModel.channels.filter(ch => ch.id === channelId);
    return matches[0];
  }
}
