import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  // app/routes/index.js
  this.route('login');
  this.route('teams', function() {
    // app/routes/teams/index.js
    this.route('team', {
      path: ':teamId'
    }, function() {
      // app/routes/teams/team/index.js
      this.route('channel', {
        path: ':channelId'
      });
    });
  });
});

export default Router;
