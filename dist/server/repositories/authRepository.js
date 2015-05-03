var passport = require('passport');
var userRepository = require('./userRepository');
var LocalStrategy = require('passport-local').Strategy;

var auth = {};

passport.use('local-register', new LocalStrategy({
  username : 'username',
  password : 'password'
},
function(username, password, done){
  userRepository.findUserByUsername(username, function(user){
    if(!user){
      return done(null, false, { message : 'Wrong username'});
    }
    user.verifyPassword(password, function (err, res) {
      if(!err)
        return done(null, false, { message: 'Wrong password'} );
      else
        return done(null, { username: user.username });
    });
  });
})
);

auth.serializeUser = function(user, done){
  done(null, user);
};

auth.deserializeUser = function(obj, done){
  done(null, obj);
};

exports.registerUser = function(req, res){
  
};