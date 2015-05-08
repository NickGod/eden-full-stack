var passport = require('passport');
var userRepository = require('./repositories/userRepository');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user').User;
var Community = require('./models/community').Community;
var session = require('express-session');

var jwt = require('jsonwebtoken');

exports.configureUserAuth = function(app){
        app.use(session({ secret: 'swag daddy', cookie: { maxAge: 2592000000 }}));
    	app.use(passport.initialize());
        app.use(passport.session());   
        
        app.post('/login',
                passport.authenticate('local', {
                    successRedirect : '/loginSuccess',
                    failureRedirect : '/loginFailure'
        }));
 
        app.get('/loginFailure', function(req, res, next) {
            res.json({
                success : false,
                errors : [
                    'incorrect username or password'
                ]
            });
        });
 
    	app.get('/loginSuccess', function(req, res, next) {
            var token = jwt.sign(req.user, 'swag daddy', {expiresInMinutes : 60*5});
            res.json({
                success : true,
                user : req.user,
                token : token
            });
        });
        
        app.get('/currentUser', function(req, res){
            res.json({
                user : req.user
            });
        });
        
        app.get('/logout', function(req, res){
            req.logout();
            res.json({
                success : true
            });
        });
       
       app.post('/register', function(req, res){
           var errors = [];
           User.find({
                        where : { username : req.body.username}
                    })
                    .then(function(user){
                        if(user){
                            errors.push('Username taken');
                        }
                        // find by email
                        User.find({
                            where : { email : req.body.email }
                        })
                        .then(function(user){
                            if(user){
                                errors.push('Email taken');
                            }
                            // no errors, therefore register user
                            if(errors.length == 0) {
                                var user = User.build({
                                    firstName : req.body.firstName,
                                    lastName : req.body.lastName,
                                    email : req.body.email,
                                    username : req.body.username,
                                    password : req.body.password
                                    
                                });
                                
                                user.save()
                                .then(function(user){
                                    passport.authenticate('local')(req, res, function () {
                                        res.redirect('/loginSuccess');
                                    });
                                })
                                .error(function(err){
                                    res.send(err);
                                });
                            } // else return list of errors
                            else{
                                res.send({errors : errors});
                            }
                            
                        })
                        .catch(function (err) {
                          res.send(err);
                        });
       });
       });
       
    	passport.serializeUser(function(user, done) {
            done(null, user);
        });
 
        passport.deserializeUser(function(user, done) {
            done(null, user);
        });

    	passport.use('local',new LocalStrategy(
            function(username, password, done) {
            process.nextTick(function() {
                // Auth Check Logic
                User.find({
                    where : {username : username}
                })
                .then(function(user){
                if(!user){
                    return done(null, false);
                }
                user.verifyPassword(password, function(err, res){
                    if(res){
                        return done(null, user);
                    }
                    else if(err){
                        return done(null, err);
                    }
                    else {
                        return done(null, false);
                    }
                });
                //return done(null, user);
                })
                .catch(function(err){
                    return done(err);
                });
    	    });
        }));
};

