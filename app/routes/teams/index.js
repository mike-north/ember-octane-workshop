import Route from '@ember/routing/route';
import { isArray } from '@ember/array';

export default class TeamsIndexRoute extends Route {
  beforeModel(transition) {
    super.beforeModel(transition);
    const teams = this.modelFor('teams');
    if (teams && isArray(teams) && teams.length > 0)
      this.transitionTo('teams.team', teams[0].id);
  }
}
