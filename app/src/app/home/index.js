export default (angular) => {
	const homeModule = angular.module('m.console.home', []);

	require('./homeCtrl').default(homeModule);

	return homeModule;
}