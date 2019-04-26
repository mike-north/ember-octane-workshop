import EmberRouter from '@ember/routing/router';
import config from 'shlack/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('teams', function() {
    this.route('team', {
      path: ':teamId'
    }, function() {
      this.route('channel', {
        path: ':channelId'
      });
    });
  });
  this.route('login');
});
