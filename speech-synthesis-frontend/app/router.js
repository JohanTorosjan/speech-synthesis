import EmberRouter from '@ember/routing/router';
import config from 'speech-synthesis-frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('synthese');
  this.route('record');
  this.route('informations');
});
