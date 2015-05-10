app.factory('CommunitiesService', function($http, $rootScope){
	
	var CommunitiesService = {
		all : function(done){
			$http.get('/api/communities')
			.success(function (communities){
				done(communities);
			});
		},
		Community : function(communityName, done){
			$http.get('/api/communities/' + communityName)
			.success(function (community){
				done(community);
			});
		}
	};
	
	return CommunitiesService;
});