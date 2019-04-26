import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import AuthService from 'shlack/services/auth';

export default class TeamSidebarComponent extends Component {
  /**
   * @type {AuthService}
   */
  @service auth;

  @action
  logout() {
    this.auth.logout();    
  }
}
