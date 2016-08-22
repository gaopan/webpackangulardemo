let aboutCtrl = ($scope) => {
	$scope.title = "Hello World ! About"
};

aboutCtrl.$inject = ['$scope'];

export default (ngModule) => {
	ngModule.controller('aboutCtrl', aboutCtrl);
}