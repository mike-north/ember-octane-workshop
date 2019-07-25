import Route from '@ember/routing/route';

export default class TeamsTeamChannelRoute extends Route {
  model({ channelId }) {
    // get all teams from parent route
    const team = this.modelFor('teams.team');
    const { channels } = team; // list of channels

    // find the match for team.id === channelId
    const matches = channels.filter(ch => ch.id === channelId);
    // make sure we have one
    if (matches.length < 1)
      throw new Error(
        `No channel ${channelId} in team ${team.id} found`
      );
    return matches[0]; // return the first match
  }
}
