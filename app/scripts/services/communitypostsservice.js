app.factory('CommunityPostsService', function($http, $rootScope){
	
	var CommunityPostsService = {
		allPosts : function(communityId, done){
			$http.get('/api/communities/' + communityId + '/posts')
				.success(function (communityPosts) {
					done(communityPosts);
				});	
		},
		getCommunityByCommunityName : function(communityName, done){
			$http.get('/api/communities/' + communityName)
			.success(function (community){
				done(community);
			});
		},
		submitPost : function (post, done){
			$http.post('/api/posts/create', {
				communityId : post.communityId,
    			userId : post.userId,
    			title : post.title,
    			body : post.body
			})
			.success(function(postId){
				done(postId);
			});
		}
	};
	
	
	return CommunityPostsService;
});