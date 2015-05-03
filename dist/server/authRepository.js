var passport = require('passport');
var userRepository = require('./userRepository');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user').User;

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);
 
app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});
 
app.get('/loginSuccess', function(req, res, next) {
    res.send(req.user);
    //res.send('Successfully authenticated');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('local',new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    // Auth Check Logic
       User.find({
           where : {username : username}
       })
       .then(function(user){
           if(!user){
               return done(null, false);
           }
           return done(null, user);
       })
       .catch(function(err){
           return done(err);
       });
  });
}));