export default (ngModule, angular) => {
	ngModule.config(['$lazyLoadStateProvider', '$urlRouterProvider', '$httpProvider',
		function($lazyLoadStateProvider, $urlRouterProvider, $httpProvider) {
			$urlRouterProvider.otherwise('/');

			$lazyLoadStateProvider
				.lzState('home', {
					url: '/',
					templateUrl: './home/home.tpl.html',
					controller: 'homeCtrl',
					moduleName: 'm.console.home',
					moduleUrl: './home/index'
				})
				.lzState('about', {
					url: '/about',
					templateUrl: './about/about.tpl.html',
					controller: 'aboutCtrl',
					moduleName: 'm.console.about',
					moduleUrl: './about/index'
				});

		}
	]);
}