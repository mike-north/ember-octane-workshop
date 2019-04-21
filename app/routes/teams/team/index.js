import Route from '@ember/routing/route';

export default class TeamsTeamIndexRoute extends Route {
  beforeModel() {
    super.beforeModel(...arguments);
    const team = this.modelFor('teams.team');
    if (team.channels && team.channels.length > 0) {
      this.transitionTo('teams.team.channel', team.channels[0].id);
    }
  }
}
