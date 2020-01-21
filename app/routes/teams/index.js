import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeamsIndexRoute extends Route {
  @service auth;

  async beforeModel() {
    await super.beforeModel(...arguments);
    const teamList = this.modelFor('teams');
    this.transitionTo('teams.team', teamList[0].id);
  }
}
