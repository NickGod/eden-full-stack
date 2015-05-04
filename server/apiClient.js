//var pg = require('pg');
var express = require('express');
var bodyParser = require('body-parser');

var userRepository = require('./repositories/userRepository');
var postRepository = require('./repositories/postRepository');
var commentRepository = require('./repositories/commentRepository');

var router = express.Router();

//registration api
router.post('/register',  function (req, res) {
      authRepository.registerUser(req, res);
});

//users api
router.get('/users/:user_id', function(req, res){
  userRepository.findUserById(req.body.userId,function(err, user){
    res.send(user);
  });
  //userRepository.getUser(req, res);
});


router.post('/users/create', function(req, res){
  //userRepository.createUser(req, res);
  userRepository.createUser({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    username : req.body.username,
    password : req.body.password,
    email : req.body.email
  }, function (user) {
    res.send(user);
  });
});

//posts api
router.get('/posts/:post_id', function(req, res){
  postRepository.getPost(req, res);
});

router.post('/posts/create', function(req, res){
  postRepository.createPost(req, res);
});

router.post('/posts/update/:post_id', function(req, res){
  postRepository.updatePost(req, res);
});

router.delete('/posts/delete/:post_id', function(req, res){
  postRepository.deletePost(req, res);
});

//comments api
router.post('/comments/create', function(req, res){
  commentRepository.createComment(req,res);
});

router.post('/comments/update/:comment_id', function(req, res){
  commentRepository.updateComment(req, res);
});

router.delete('/comments/delete/:comment_id', function(req, res){
  commentRepository.deleteComment(req, res);
});

exports.handleRequest = router;

//app.use('/api', router);
//app.listen(port);
//console.log('magic happens on port ' + port);
