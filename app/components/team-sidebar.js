import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class TeamSidebarComponent extends Component {
    @service auth;
}
