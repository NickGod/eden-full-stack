var pg = require('pg');
var express = require('express');
var bodyParser = require('body-parser');


var userRepository = require('./repositories/userRepository');
var postRepository = require('./repositories/postRepository');
var commentRepository = require('./repositories/commentRepository');
var app = module.exports = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = Number(process.env.PORT || 1614);
var host = process.env.ENVIRONMENT || 'local';

var router = express.Router();

//users api
router.get('/users/:user_id', function(req, res){
  userRepository.getUser(req, res);
});

router.post('/users/create', function(req, res){
  userRepository.createUser(req, res);
});

//posts api
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

app.use('/api', router);
app.listen(port);
console.log('magic happens on port ' + port);
