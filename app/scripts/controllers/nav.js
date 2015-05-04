'use strict';

app.controller('NavCtrl', function ($scope, $location, Post, PgAuth) {
  $scope.post = {title: '', content:''};
 
 $scope.signedIn = PgAuth.signedIn;
 $scope.logout = PgAuth.logout;
 $scope.user = PgAuth.user;
  //$scope.signedIn = Auth.signedIn;
  //$scope.logout = Auth.logout;
  //$scope.user = Auth.user;

  $scope.submitPost = function() {
    $scope.post.creator = $scope.user.profile.username;
    $scope.post.creatorUID = $scope.user.uid;
    Post.create($scope.post).then(function (ref) {
      $location.path('/posts/' + ref.name());
      $scope.post = {title: '', content: ''};
    });
  };

});
