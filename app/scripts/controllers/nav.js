'use strict';

app.controller('NavCtrl', function ($scope, $location, $cookieStore, AuthService) {
 
 $scope.signedIn = AuthService.signedIn;
 $scope.logout = AuthService.logout;
 $scope.user = $cookieStore.get('currentUser');
  //$scope.signedIn = Auth.signedIn;
  //$scope.logout = Auth.logout;
  //$scope.user = Auth.user;

/*
  $scope.submitPost = function() {
    $scope.post.creator = $scope.user.profile.username;
    $scope.post.creatorUID = $scope.user.uid;
    Post.create($scope.post).then(function (ref) {
      $location.path('/posts/' + ref.name());
      $scope.post = {title: '', content: ''};
    });
  };
*/

});
