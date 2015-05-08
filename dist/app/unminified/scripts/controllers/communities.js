'use strict';

app.controller('CommunitiesCtrl', function ($scope, $location, $window, Communities) {

	Communities.all(function(communities){
		$scope.communities = communities;
	});
	
	
});