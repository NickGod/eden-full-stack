var pg = require('pg');
var conString = 'pg://admin:edenhack@104.131.122.35:5432/Eden';
var knex = require('knex')({
  client: 'pg',
  connection : conString
});

exports.createComment = function(req, res){
  knex('comments')
  .insert({'post_id' : req.body.post_id,
           'user_id' : req.body.user_id,
           'text' : req.body.text})
  .exec(function(err, result){
    if(!err) res.send({'comment_created' : true});
    else res.send({'comment_created' : false});
  });
};

exports.updateComment = function(req, res){
  knex('comments')
  .where({'comment_id' : req.params.comment_id})
  .update({'text' : req.body.text})
  .exec(function(err, result){
    if(!err) res.send({'comment_updated' : true});
    else res.send({'comment_updated' : false});
  });
};

exports.deleteComment = function(req, res){
  knex('comments')
  .where({'comment_id' : req.params.comment_id})
  .delete()
  .exec(function(err, result){
    if(!err) res.send({'comment_deleted' : true});
    else res.send({'comment_deleted' : false});
  });
};
