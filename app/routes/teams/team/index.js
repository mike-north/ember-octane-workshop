import Route from '@ember/routing/route';

export default class TeamsTeamIndexRoute extends Route {
  async beforeModel(transition) {
    await super.beforeModel(transition);
    const { channels } = this.modelFor('teams.team');
    // TODO: handle errors
    this.transitionTo('teams.team.channel', channels[0].id);
  }
}
