import Route from '@ember/routing/route';
import { ALL_TEAMS } from '../teams';

export default class TeamsTeamRoute extends Route {
  model({ teamId }) {
    const matches = ALL_TEAMS.filter(
      t => `${t.id}` === `${teamId}`
    );
    return matches[0];
  }
}
