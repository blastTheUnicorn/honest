var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


  var ObjectSchema = new mongoose.Schema({
    lost : Boolean,
    found : Boolean,
    category : String,
    keyWords : String,
    comments : String
  })

  var UserSchema = new mongoose.Schema({
    local : {
      username : {type : String, require : true, uniq : true},
      password : {type : String, require : true},
      token : String,
      name : String,
      email : {type : String, uniq : true},
      lost : [ObjectSchema],
      found : [ObjectSchema]
    },
    facebook : {
      id : String,
      token : String,
      email : String,
      name : String
    }
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

mongoose.model('User',UserSchema)

  var testUser = {
    username : 'lulu',
    password : '1234',
    name : 'luisa',
    email : "lufeza95@gmail.com"
  }
  // User.create([testUser]);

