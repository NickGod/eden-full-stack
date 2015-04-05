var pg = require('pg');
var conString = 'pg://admin:edenhack@104.131.122.35:5432/Eden';
var knex = require('knex')({
  client: 'pg',
  connection : conString
});


exports.getUser = function(req, res){
  knex('users')
  .where('user_id', req.params.user_id)
  .exec(function(err, user){
    if(err) res.send(err);
    else res.send(user);
  });
};

exports.createUser = function(req, res){
  knex('users')
  .insert({'user_type' : req.body.user_type,
           'first_name' : req.body.first_name,
           'last_name' : req.body.last_name,
           'username' : req.body.username,
           'password' : req.body.password})
  .exec(function(err, result){
    if(!err) res.send({'user_created' : true});
    else res.send({'user_created' : false});
  });
};
