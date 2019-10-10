import Route from '@ember/routing/route';
import fetch from 'fetch';
import RSVP from 'rsvp';
export default class TeamsTeamRoute extends Route {
  async model({ teamId }) {
    const pResp1 = fetch(`/api/teams/${teamId}`);
    // const pResp2 = fetch(`/api/teams/${teamId}`);
    // return RSVP.hash({
    //   value: 'Mike',
    //   teams1: (await pResp1).json(),
    //   teams2: (await pResp1).json(),
    // });
    return await (await pResp1).json();
  }
}
