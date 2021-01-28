//const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
var bcrypt = require('bcrypt');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
var client;
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
});
//userSchema.plugin(passportLocalMongoose);
var User = mongoose.model("User", userSchema);
//passport.use(User.createStrategy());
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());
function addUser(data,res){
    User.find({'email' : data.email},function(err,user){
      if(err){console.log(err);}
      else if(user.length !== 0){
        console.log("duplicate");
       return res.status(401).json("user already exist");
      }
      else if(data.password !== data.confirmPassword){
        res.status(401).json("Passwords does not match");
      }
      else 
      bcrypt.hash(data.password, parseInt(process.env.BCRYPT_SALT_ROUNDS,10))
      .then(function(hashedPassword) {
          data.password = hashedPassword;
          var myData = new User({
            name: data.fullname,
            email: data.email,
            password: data.password,
            age: data.age,
            gender: data.gender
          });
          myData.save().then(item => {
              res.status(201).send("user added saved to database");   
          }).catch(err => {
           res.status(400).send("unable to save to database");
          });
      })
    })
    
   
}
function startConnection(type){
const url = type;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client = mongoose.connection;
client.on('ECONNREFUSED', console.error.bind(console, 'Connection Error:'));
client.once('open', function() {
  console.log("Successfully connected to MongoDB!");
});
}
function getUser(Cred,callback){
  
  var status;
  User.find({'email' : Cred.email},function(err,user){
   
    if(user.length === 0){status = "noUser";callback(status);}
    else 
    bcrypt.compare(Cred.password,user[0].password, function(err, result) {
      if(result === true){status = "pass"}
      else {status = "wrongPassword";}
    callback(status);
  });
  });
}

function getUserSchema(){
  return userSchema;
}
function getClient(){
  return client;
}
module.exports = {startConnection, getClient , getUserSchema , addUser , getUser} ;