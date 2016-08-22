let homeCtrl = ($scope) => {
	$scope.title = "Hello World !"
};

homeCtrl.$inject = ['$scope'];

export default (ngModule) => {
	ngModule.controller('homeCtrl', homeCtrl);
}