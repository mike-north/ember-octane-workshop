import Route from '@ember/routing/route';
import { isArray } from '@ember/array';

export default class TeamsTeamIndexRoute extends Route {
  beforeModel() {
    super.beforeModel(...arguments);
    const { channels } = this.modelFor('teams.team');
    if (channels && isArray(channels) && channels.length > 0)
      this.transitionTo('teams.team.channel', channels[0].id);
  }
}
