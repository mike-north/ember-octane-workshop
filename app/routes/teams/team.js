import Route from '@ember/routing/route';

export default class TeamsTeamRoute extends Route {
  model({ teamId }) {
    const allTeams = this.modelFor('teams');
    const matches = allTeams.filter(team => team.id === teamId);
    if (matches.length < 1)
      throw new Error(`No team ${teamId} found`);
    return matches[0];
  }
}
