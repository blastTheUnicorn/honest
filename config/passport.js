var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(passport){

  passport.use(new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true 
    }, function(req, username, password, done){
    User.findOne({'local.username' : username}, function(err, user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null, false, {message : 'Incorrect username'});
      }
      if(!user.validPassword(password)){
        return done(null, false, {message : 'Incorrect password'})
      }
      return done(null, user)
    })
  }));
};
