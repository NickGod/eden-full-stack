var User = require('../models/user').User;

exports.findUserById = function(id, done){
  User.find({ where : { id : id}})
  .then(function(user){
    done(null, user);
  })
  .catch(function(err){
    done(err, null);
  });
};

exports.findUserByUsername = function(username, done){
  User.find({ where : { username: username }})
  .then(function(user){
    done(null, user);
  })
  .catch(function(err){
    done(err, null);
  });
};

exports.findUserByEmail = function(email, done){
  User.find({ where : { email: email }})
  .then(function(user){
    done(null, user);
  })
  .catch(function(err){
    done(err, null);
  });
};

exports.createUser = function(user, done){
    User.create(user)
  .then(function(user){
    done(null, user);
   })
   .catch(function(err){
     done(err , null);
   });
};