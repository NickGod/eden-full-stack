'use strict';

app.controller('CommunityPostsCtrl', function ($scope, $location, $routeParams, $cookieStore, CommunityPostsService) {
		
		$scope.currentUser = $cookieStore.get('currentUser');
			
		$scope.communityName = $routeParams.communityName;
		CommunityPostsService.getCommunityByCommunityName($routeParams.communityName, function(community){
			
			$scope.post =  {
				title: '', 
				body: '', 
				communityId: community.communityId, 
				userId : $scope.currentUser.userId,
				type: 'Q&A'
				};
				
			CommunityPostsService.allPosts($scope.post.communityId, function(communityPosts){
			$scope.posts = communityPosts;
			});
		});
		
		$scope.submitPost = function () {
			CommunityPostsService.submitPost($scope.post, function(post){
				if(post.success){
					CommunityPostsService.getCommunityByCommunityName($routeParams.communityName, function(community){
						CommunityPostsService.allPosts($scope.post.communityId, function(communityPosts){
						$scope.posts = communityPosts;
						});
					});
					$(function () {
   						$('#newPostModal').modal('toggle');
					});
				}
			});
		};
});