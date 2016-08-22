import angular from 'angular';
import './app/app';

angular.element(document).ready(() => {
	let uiView = document.createElement('ui-view');
	document.body.insertBefore(uiView, document.body.childNodes[0]);
	angular.bootstrap(document, ['m.console']);
});