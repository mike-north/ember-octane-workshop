import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class TeamsTeamRoute extends Route {
  async model({ teamId }) {
    const resp = await fetch(`/api/teams/${teamId}`);
    return await resp.json();
  }
}
