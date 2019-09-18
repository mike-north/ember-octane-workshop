import Route from '@ember/routing/route';

export default class TeamIndexRoute extends Route {
  async beforeModel(transition) {
    await super.beforeModel(transition);
    const { channels } = this.modelFor('teams.team');
    this.replaceWith('teams.team.channel', channels[0].id);
  }
}
/**
 
   beforeModel
     Promise.all
      |super.beforeModel
      |my stuff
 */
