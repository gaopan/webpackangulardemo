export default (angular) => {
	const aboutModule = angular.module('m.console.about', []);

	require('./aboutCtrl').default(aboutModule);
}