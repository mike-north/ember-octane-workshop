import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeamsRoute extends Route {
  @service auth;
  async beforeModel() {
    await super.beforeModel(); // parent work
    await this.auth.fetchUserRecord(); // my work
  }
  // "fetch data from my API"
  // async model() {}
}
