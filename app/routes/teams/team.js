import Route from '@ember/routing/route';

export default class TeamIndexRoute extends Route {
  async model({ teamId: id }) {
    const teamResponse = await fetch(`/api/teams/${id}`);
    if (!teamResponse.ok) {
      throw new Error('Problem loading team');
    }
    return await teamResponse.json();
  }
}
