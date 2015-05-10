var Post = require('../models/post').Post;
var User = require('../models/user').User;

exports.createPost = function(post, done){
  var newPost = Post.build(post);
  newPost.save()
  .then(function(post){
    done(null, post)
  })
  .catch(function(err){
    done(err, null);
  });
};

exports.getPostById = function(postId, done){
  Post.find({
    where : { postId : postId },
    include : [{model :User, attributes : ["firstName", "lastName"]}]
  })
  .then(function(post){
    done(null, post);
  })
  .catch(function(err){
    done(err, null);
  });
};

exports.getPostsByCommunityId = function(communityId , done){
  Post.findAll({
    where : {communityId : communityId},
    order : '"createdDate" DESC',
    include : [{model :User, attributes : ["firstName", "lastName"]}]
  })
  .then(function(posts){
    done(null, posts);
  })
  .catch(function(err){
    done(err, null);
  });
};

/*
var pg = require('pg');
var conString = 'pg://admin:edenhack@104.131.122.35:5432/Eden';


var knex = require('knex')({
  client: 'pg',
  connection : conString
});

exports.getPost = function(req, res){
  knex('posts')
  .select()
  .where({'post_id' : req.params.post_id})
  .exec(function(err, result){
    if(!err) res.send(result);
    else res.send({'error' : 'could not get post'});
  });
};

exports.createPost = function(req, res){
  knex('posts')
  .insert({'community_id' : req.body.community_id,
           'user_id' : req.body.user_id,
           'text' : req.body.text})
  .exec(function(err, result){
    if(!err) res.send({'post_created' : true})
    else res.send({'post_created' : false});
    });
};

exports.updatePost = function(req, res){
  knex('posts')
  .where({'post_id' : req.params.post_id})
  .update({'text' : req.body.text})
  .exec(function(err, result){
    if(!err)
      res.send({'post_updated' : true});
    else
      res.send({'post_updated' : false});
  });
};

exports.deletePost = function(req, res){
  knex('posts')
  .where({'post_id' : req.params.post_id})
  .delete()
  .exec(function(err, result){
    if(!err)
      res.send({'post_deleted' : true});
    else
      res.send({'post_deleted' : false});
  });
};

*/