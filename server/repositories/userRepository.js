var User = require('../models/user').User;

exports.findUserById = function(id, done){
  User.find({ where : { id : id}})
  .then(function(user){
    done(user);
  })
  .catch(function(err){
    done(err);
  });
};

exports.findUserByUsername = function(username, done){
  User.find({ where : { username: username }})
  .then(function(user){
    done(user);
  })
  .catch(function(err){
    done(err);
  });
};

exports.findUserByEmail = function(email, done){
  User.find({ where : { email: email }})
  .then(function(user){
    done(user);
  })
  .catch(function(err){
    done(err);
  });
};

exports.createUser = function(user, done){
    User.create(user)
  .then(function(user){
    done(user);
   })
   .catch(function(err){
     done(err);
   });
};

/*
var pg = require('pg');
var conString = 'pg://admin:edenhack@104.131.122.35:5432/Eden';
var knex = require('knex')({
  client: 'pg',
  connection : conString
});

// get user by username, used for registration/authentication
exports.findUserByUsername = function(username){
  knex('users')
  .where('username', username)
  .exec(function(err, user){
    if(err) return null;
    else return user;
  });
};

exports.getUserByUserId = function(id){
   knex('users')
  .where('user_id', id)
  .exec(function(err, user){
    if(err) return null;
    else return user;
  });
};

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
  .returning('user_id')
  .insert({'user_type' : req.body.user_type,
           'first_name' : req.body.first_name,
           'last_name' : req.body.last_name,
           'username' : req.body.username,
           'password' : req.body.password})
  .exec(function(err, result){
    if(!err) null;
    else result.user_id;
  });
};
*/
/*
exports.createUser = function(req, res){
  knex('users')
  .returning('user_id')
  .insert({'user_type' : req.body.user_type,
           'first_name' : req.body.first_name,
           'last_name' : req.body.last_name,
           'username' : req.body.username,
           'password' : req.body.password})
  .exec(function(err, result){
    if(!err) res.send({'user_id' : result});
    else res.send({'user_id' : -1});
  });
};
*/