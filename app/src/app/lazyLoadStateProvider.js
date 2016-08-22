export default (ngModule, angular) => {
	let provider = function() {
		let $this = {};
		this.setStateProvider = function(stateProvider) {
			this._stateProvider = stateProvider;
		};
		this.lzState = function(name, opts) {
			let def = opts || {};
			if (def.templateUrl) {
				let url = def.templateUrl;
				def.templateProvider = function($q) {
					let delay = $q.defer();
					let req = require.context("./", true, /^\.\/.*\.tpl\.html$/);

					req.ensure([url], function(require) {
						let template = require(url);
						console.log(template);
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
						console.log(module);
						delay.resolve(module);
					});
					return delay.promise;
				};
				resolve._load.$inject = ['$q', '$ocLazyLoad'];
			}
			return this._stateProvider.state(name, def);
		};
		let $get = function() {
			return $this;
		};

		$get.$inject = [];

		this.$get = $get;
	};
	provider.$inject = [];
	ngModule.provider('$lazyLoadState', provider);
};