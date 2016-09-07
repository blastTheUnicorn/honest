var db = require('mongodb')
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');


  var ObjectSchema = new mongoose.Schema({
    _user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    lostOrFound: String,
    geo: {
      type: [Number],  // [<longitude>, <latitude>]
      index: '2d'      // create the geospatial index
    },
    category : String,
    keyWords : String,
    comments : String
  });


  var UserSchema = new mongoose.Schema({
    local : {
      username : {type : String, require : true, unique: true},
      password : {type : String, require : true},
      name : String,
      email : {type : String, require : true, unique: true},
      lost : [{type: mongoose.Schema.Types.ObjectId, ref: 'ObjectModel'}],
      found : [{type: mongoose.Schema.Types.ObjectId, ref: 'ObjectModel'}]
    }
    // ,facebook : {
    //   id : String,
    //   token : String,
    //   email : String,
    //   name : String
    // }
    // ,twitter : {
    //   id : String,
    //   token : String,
    //   displayName : String,
    //   username : String
    // },
    // google : {
    //   id : String,
    //   token : String,
    //   email : String,
    //   name : String
    // }
  });

UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

UserSchema.methods.generateJWT = function(){
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id : this._id,
    username : this.username,
    exp : parseInt(exp.getDate())
  }, 'MEOW')
};
UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })

var User = mongoose.model('User', UserSchema);

var ObjectModel = mongoose.model('ObjectModel', ObjectSchema);


// testUser.save(function(err){
//   if(err){
//     console.log(err)
//   }
//   var newObj = new FoundObj ({
//     _user : testUser._id, 
//     lost : true,
//     category : 'wallet'
//   })

//   newObj.save();

// });
