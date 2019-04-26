import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class TeamsTeamChannelRoute extends Route {
  async model({ channelId }) {
    const {
      teamId,
    } = /** @type {{teamId: string}} */ (this.paramsFor(
      'teams.team'
    ));
    // const team = this.modelFor('teams.team');
    const resp = await fetch(
      `/api/teams/${teamId}/channels/${channelId}`
    );
    return resp.json();
  }
}
