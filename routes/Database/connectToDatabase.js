
const mongoose = require("mongoose");
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
const dataSchema = new mongoose.Schema({
    resultemail : String,
    resultDate : String,
    resultValue : String
});
var Data = mongoose.model("Data",dataSchema);
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
function submitData(result,user) {
  var datetime = new Date();
  var myData = new Data({
    resultemail : user,
    resultDate : datetime.toISOString().slice(0,10),
    resultValue : result
  });
  myData.save();
}
function getData(email,Callback) {
  Data.find({'resultemail' : email},function (err,result) {
  Callback(result);
  });
}
module.exports = {getData,submitData, startConnection, getClient , getUserSchema , addUser , getUser} ;