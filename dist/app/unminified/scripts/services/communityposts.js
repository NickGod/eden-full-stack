app.factory('CommunityPosts', function($http, $rootScope){
	
	var CommunityPosts = {
		allPosts : function(communityName, done){
			$http.get('/api/communities/' + communityName)
			.success(function (community){
				$http.get('/api/communities/' + community.communityId + '/posts')
				.success(function (communityPosts) {
					done(communityPosts);
				})
			});
		}
	};
	
	
	return CommunityPosts;
});