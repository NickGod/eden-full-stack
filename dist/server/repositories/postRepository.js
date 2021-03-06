var pg = require('pg');
var conString = 'pg://admin:edenhack@104.131.122.35:5432/Eden';
var knex = require('knex')({
  client: 'pg',
  connection : conString
});

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
