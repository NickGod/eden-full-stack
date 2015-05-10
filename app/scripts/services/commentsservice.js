'use strict';

app.factory('CommentService', function($http){
  var CommentService = {
    getCommentsByPostId : function(postId, done){
      $http.get('/api/comments/' + postId)
      .success(function (post) {
        done(post);
      });
    }, 
    postComment : function(comment, done){
      $http.post('/api/comments/create', {
        postId : comment.postId,
        userId : comment.userId,
        text : comment.text
      })
      .success(function (comment) {
        done(comment);
      });
    }
  };
  
  return CommentService;
});
