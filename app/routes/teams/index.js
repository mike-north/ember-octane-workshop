import Route from '@ember/routing/route';

export default class TeamsIndexRoute extends Route {
  async beforeModel(transition) {
    await super.beforeModel(transition);
    const allTeams = this.modelFor('teams');
    this.transitionTo('teams.team', allTeams[0].id);
  }
}
