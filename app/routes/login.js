import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
    @service auth;
    async beforeModel(transition) {
        await super.beforeModel(transition);
        if (this.auth.currentUserId) {
            this.transitionTo('teams');
        }
    }
}
