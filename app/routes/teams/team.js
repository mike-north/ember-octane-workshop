import Route from '@ember/routing/route';

export default class TeamsTeamRoute extends Route {
  model({ teamId }) {
    const teams = this.modelFor('teams');
    const matches = teams.filter(({ id }) => id === teamId);
    return matches[0];
  }
}
