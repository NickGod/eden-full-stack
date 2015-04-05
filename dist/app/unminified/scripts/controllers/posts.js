'use strict';

app.controller('PostsCtrl', function ($scope, $location, Post, Auth) {
  $scope.posts = Post.all;
  $scope.user = Auth.user;

  $scope.post =  {title: '', content: '', type: 'Q&A'};

  $scope.deletePost = function(post) {
    Post.delete(post);
  };

});
