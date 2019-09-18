import Route from '@ember/routing/route';

export default class TeamsIndexRoute extends Route {
  async beforeModel(transition) {
    await super.beforeModel(transition);
    const teamList = this.modelFor('teams');
    this.transitionTo('teams.team', teamList[0].id);
  }
}
