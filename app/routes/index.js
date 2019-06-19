import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
    @service auth;
    async beforeModel() {
        // @ts-ignore
        await super.beforeModel(...arguments);
        if (this.auth.currentUserId) {
            this.transitionTo('teams');
        } else {
            this.transitionTo('login');
        }
    }
}
