var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

var auth = jwt({secret: 'MEOW', userProperty: 'payload'})

var User = mongoose.model('User');



router.post('/api/login', function(req, res ,next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  console.log("Testing", req.body);
  passport.authenticate('local', function(err, user, info){
    if(err){return next(err);}

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
})

module.exports = router;
