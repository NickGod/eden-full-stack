'use strict';

app.controller('PostsCtrl', function ($scope, $location, $routeParams, $cookieStore, CommentService, AuthService, PostService) {
  $scope.postId = $routeParams.postId;
  $scope.signedIn = AuthService.signedIn;
  $scope.logout = AuthService.logout;
  $scope.user = AuthService.user();
 
 PostService.getPostByPostId($scope.postId, function(post){
    $scope.post = post;
  });

  $scope.newComment =  { postId : $scope.postId, userId : $scope.user.userId , text: '' };

  $scope.postComment = function (){
    CommentService.postComment($scope.newComment, function(comment){
      CommentService.getCommentsByPostId($scope.postId, function(comments){
        	$scope.comments = comments;  
        });
      });
  };
 

  CommentService.getCommentsByPostId($scope.postId, function(comments){
    $scope.comments = comments;  
  });


});
