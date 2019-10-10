import Route from '@ember/routing/route';

export default class TeamsIndexRoute extends Route {
  async beforeModel() {
    await super.beforeModel(...arguments);
    const teams = this.modelFor('teams');
    this.transitionTo('teams.team', teams[0].id);
  }
}
