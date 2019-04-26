import Route from '@ember/routing/route';

export default class TeamsTeamChannelRoute extends Route {
  model({ channelId }) {
    const team = this.modelFor('teams.team');
    const matches = team.channels.filter(ch => `${ch.id}` === `${channelId}`);
    return matches[0];
  }
}
