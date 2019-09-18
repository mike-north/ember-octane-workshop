import Route from '@ember/routing/route';

export default class TeamsTeamChannelRoute extends Route {
  model({ channelId }) {
    const team = this.modelFor('teams.team');
    return { team, channelId };
  }
}
