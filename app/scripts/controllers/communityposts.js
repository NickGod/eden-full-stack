'use strict';

app.controller('CommunityPostsCtrl', function ($scope, $location, $routeParams, CommunityPosts) {
		
		$scope.communityName = $routeParams.communityName;
		CommunityPosts.allPosts($routeParams.communityName, function(communityPosts){
			$scope.posts = communityPosts;
		});
});