var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(passport){
  passport.use(new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true 
  }, function(req, username, password, done){
    User.findOne({'local.username' : username}, function(err, user){
      if(err){ return done(err); }
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

// ===== FACEBOOK =====

passport.use(new FacebookStrategy({
// pull in our app id nd secret from our auth.js file
  clientID        : configAuth.facebookAuth.clientID,
  clientSecret    : configAuth.facebookAuth.clientSecret,
  callbackURL     : configAuth.facebookAuth.callbackURL
},

  function (token, refreshToken, profile, done) {
    process.nextTick( function () {
      User.findOne({ 'facebook.id' : profile.id }, function (err, user) {
        if (err) { return done(err); }

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.facebook.id     = profile.id;
          newUser.facebook.token  = token;
          newUser.facebook.name   = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email = profile.email[0].value; // FB can return multiple emails so we'll use the first one.

          // save our user to the db
          newUser.save( function (err) {
            if(err) { throw err; } 
            // if successful, return the new user
            return done(null, newUser);
          });
        }
      });
    });
  })
);
