'use strict';

app.controller('CommunitiesCtrl', function ($scope, $location, $window, CommunitiesService) {

	CommunitiesService.all(function(communities){
		$scope.communities = communities;
	});
	
	
});