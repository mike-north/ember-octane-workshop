import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('login');
  this.route('teams', function() {
    /**
     * * name: teams.team
     * * /teams/(linkedin)
     */
    this.route('team', { path: ':teamId' }, function() {
      /**
       * * name: teams.team.channel
       * * /teams/(linkedin)/(jobs)
       */
      this.route('channel', {
        path: ':channelId',
      });
    });
  });
});

export default Router;
