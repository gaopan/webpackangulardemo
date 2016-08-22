import angular from 'angular';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import 'angular-ui-router';
import 'oclazyload';

const app = angular.module('m.console', [
	'ngCookies', 'ngResource', 'ui.router', 'oc.lazyLoad'
]);

require('./lazyLoadStateProvider').default(app, angular);
require('./config').default(app, angular);

export default app;