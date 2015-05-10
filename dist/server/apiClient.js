//var pg = require('pg');
var express = require('express');
var bodyParser = require('body-parser');

var userRepository = require('./repositories/userRepository');
var postRepository = require('./repositories/postRepository');
var commentRepository = require('./repositories/commentRepository');
var communityRepository = require('./repositories/communityRepository');

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var router = express.Router();

//router.use('/', expressJwt({ secret : 'sW@gD4ddy'}));

//users api
router.get('/users/:userId', function(req, res){
  userRepository.findUserById(req.params.userId,function(err, user){
    if(!err){
      res.send(user);
    }
    else {
      res.send({error : err.message});
    }
  });
});


router.post('/users/create', function(req, res){
  userRepository.createUser({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    username : req.body.username,
    password : req.body.password,
    email : req.body.email
  }, function (err, user) {
    if(!err){
      res.send(user);
    }
    else {
      res.send({error : err.message});
    }
  });
});

//posts api
router.get('/posts/:postId', function(req, res){
  postRepository.getPostById(req.params.postId, function (err, post) {
    if(!err){
      res.send(post);
    }
    else{
      res.send({error : err.message});
    }
  });
});

router.post('/posts/create', function(req, res){
  var post = {
    communityId : req.body.communityId,
    userId : req.body.userId,
    title : req.body.title,
    body : req.body.body,
  };
  postRepository.createPost(post, function(err, post){
    if(!err){
      res.send({
        success : true, 
        postId : post.postId
      });
    }
    else{
      res.send({error : err.message});
    }
  });
});

router.post('/posts/update/:post_id', function(req, res){
  postRepository.updatePost(req, res);
});

router.delete('/posts/delete/:post_id', function(req, res){
  postRepository.deletePost(req, res);
});

//comments api
router.get('/comments/:postId', function(req, res){
  commentRepository.getCommentsByPostId(req.params.postId, function (err, comments) {
    if(!err){
      res.send(comments);
    } else{
      res.send({error : err});
    }
  })
});

router.post('/comments/create', function(req, res){
  var comment = {
    postId : req.body.postId,
    userId : req.body.userId,
    text : req.body.text
  };
  commentRepository.createComment(comment, function(err, comment){
    if(!err){
      res.send({
        success : true, 
        comment : comment.commentId
      });
    }
    else{
      res.send({error : err.message});
    }
  });
});

router.post('/comments/update/:comment_id', function(req, res){
  commentRepository.updateComment(req, res);
});

router.delete('/comments/delete/:comment_id', function(req, res){
  commentRepository.deleteComment(req, res);
});


//community api

router.get('/communities', function(req, res){
  communityRepository.getAllCommunities(function(communities){
    res.send(communities);
  });
});

router.get('/communities/:communityName', function(req, res){
  communityRepository.getCommunityByCommunityName(req.params.communityName, function(err, community){
    if(!err){
      res.send(community);
    }
    else{
      res.send({error : err.message});
    }
  });
});

router.get('/communities/:communityId/posts', function(req, res){
  //res.send(req.params.communityId);
  postRepository.getPostsByCommunityId(req.params.communityId, function(err, posts){
    if(!err){
      res.send(posts);
    }
    else{
      res.send({error : err.message});
    }
  });
});

exports.handleRequest = router;

//app.use('/api', router);
//app.listen(port);
//console.log('magic happens on port ' + port);
