app.factory('Communities', function($http, $rootScope){
	
	var Communities = {
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
	
	
	return Communities;
});