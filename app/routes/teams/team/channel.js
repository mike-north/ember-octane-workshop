import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class TeamShowChannelRoute extends Route {
  async model({ channelId }) {
    const team = this.modelFor('teams.team');
    const response = await fetch(
      `http://localhost:4200/api/teams/${team.id}/channels/${channelId}`
    );
    if (!response.ok) {
      throw new Error('Problem loading team');
    }
    return await response.json();
  }
}
