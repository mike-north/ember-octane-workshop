import Route from '@ember/routing/route';

export default class TeamsTeamIndexRoute extends Route {
  async beforeModel() {
    await super.beforeModel(...arguments);
    const { channels } = this.modelFor('teams.team');
    this.transitionTo('teams.team.channel', channels[0].id);
  }
}
