import Route from '@ember/routing/route';

export default class TeamsTeamChannelRoute extends Route {
    model({ channelId }) {
        const { channels } = this.modelFor('teams.team');
        const matches = channels.filter(({ id }) => id === channelId);
        return matches[0];
    }
}
