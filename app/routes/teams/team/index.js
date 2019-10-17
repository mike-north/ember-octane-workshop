import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeamsIndexRoute extends Route {
  @service auth;

  async beforeModel() {
    await super.beforeModel(...arguments);
    const { channels: channelList } = this.modelFor('teams.team');
    this.transitionTo('teams.team.channel', channelList[0].id);
  }
}
