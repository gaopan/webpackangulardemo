export default (ngModule, angular) => {
	ngModule.config(['$lazyLoadStateProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider',
		function($lazyLoadStateProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
			$urlRouterProvider.otherwise('/');

			$lazyLoadStateProvider.setStateProvider($stateProvider);
			$lazyLoadStateProvider.lzState('home', {
				url: '/',
				templateUrl: './home/home.tpl.html',
				controller: 'homeCtrl',
				moduleName: 'm.console.home',
				moduleUrl: './home/index'
			});

			// $stateProvider.state('home', {
			// 	url: '/',
			// 	templateUrl: './app/src/app/home/home.tpl.html',
			// 	controller: 'homeCtrl',
			// 	resolve: {
			// 		_load: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
			// 			let delay = $q.defer();
			// 			require.ensure([], function(require) {
			// 				let module = require('./home').default(angular);
			// 				$ocLazyLoad.load({
			// 					name: 'm.console.home'
			// 				});

			// 				delay.resolve(module);
			// 			});

			// 			return delay.promise;
			// 		}]
			// 	}
			// }).state('about', {
			// 	url: '/about',
			// 	templateUrl: './app/src/app/about/about.tpl.html',
			// 	controller: 'aboutCtrl',
			// 	resolve: {
			// 		_load: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
			// 			let delay = $q.defer();
			// 			require.ensure([], function(require) {
			// 				let module = require('./about').default(angular);
			// 				$ocLazyLoad.load({
			// 					name: 'm.console.about'
			// 				});

			// 				delay.resolve(module);
			// 			});

			// 			return delay.promise;
			// 		}]
			// 	}
			// });
		}
	]);
}