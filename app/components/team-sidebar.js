import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class TeamSidebarComponent extends Component {
  @service auth;
  @service router;

  @action
  doLogout() {
    this.auth.clearSession();
    this.router.transitionTo('login');
  }
}
