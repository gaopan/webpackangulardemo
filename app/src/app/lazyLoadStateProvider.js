export default (ngModule, angular) => {
	let provider = function($stateProvider) {
		let self = this;
		let $this = $stateProvider;
		this.lzState = function(name, opts) {
			let def = opts || {};
			if (def.templateUrl) {
				let url = def.templateUrl;
				def.templateProvider = function($q) {
					let delay = $q.defer();
					require.ensure([], function(require) {
						let req = require.context("./", true, /^\.\/.*\.tpl\.html$/);
						let template = req(url);
						delay.resolve(template);
					});
					return delay.promise;
				};
				def.templateUrl = undefined;
				def.templateProvider.$inject = ['$q'];
			}
			let resolve = def.resolve = def.resolve || {};
			if (def.moduleName && def.moduleUrl) {
				let moduleName = def.moduleName,
					moduleUrl = def.moduleUrl;
				resolve._load = function($q, $ocLazyLoad) {
					let delay = $q.defer();
					require.ensure([], function(require) {
						let req = require.context('./', true, /^\.\/.*$/);
						let module = req(moduleUrl).default(angular);
						$ocLazyLoad.load({
							name: moduleName
						});
						delay.resolve(module);
					});
					return delay.promise;
				};
				resolve._load.$inject = ['$q', '$ocLazyLoad'];
			}
			let state = angular.extend($stateProvider.state(name, def), {
				lzState: self.lzState
			});
			return state;
		};
		let $get = function() {
			return $this;
		};

		$get.$inject = [];

		this.$get = $get;
	};
	provider.$inject = ['$stateProvider'];
	ngModule.provider('$lazyLoadState', provider);
};