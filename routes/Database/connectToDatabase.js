//const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const path = require('path');
var bcrypt = require('bcrypt');
var client;
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
});
var User = mongoose.model("User", userSchema);
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

function getUserSchema(){
  return userSchema;
}
function getClient(){
  return client;
}
module.exports = {startConnection, getClient , getUserSchema , addUser} ;