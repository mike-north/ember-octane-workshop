import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

/*
   /
    index.html << "if logged out, /login, otherwise /teams"
    /teams
      index.html  <<  "default to the first team"
      /:teamId
        index.html <<  "default to the first channel"
        /:channelId
    /login




*/

Router.map(function() {
  this.route('login');
  /**
   * * BEFORE: teams.html
   * * AFTER:
   * *         teams/
   * *               index.html
   * *               team.html
   */
  //   /teams
  this.route('teams', function() {
    // this.route('index', { path: '' });
    /**
     * * BEFORE: teams/team.html
     * * AFTER:
     * *         teams/team/
     * *               index.html
     * *               channel.html
     */
    //   /teams/LINKEDIN
    this.route('team', { path: ':teamId' }, function() {
      //   /teams/<LINKEDIN>/<PEMBERLY>
      this.route('channel', {
        path: ':channelId',
      });
    });
  });
});

export default Router;
