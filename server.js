const configurations = require('./Configs/configs');
const upload = require('./routes/Database/uploadFilesystem');
const Database = require('./routes/Database/connectToDatabase');
require("dotenv").config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Router = require('./routes/router');
const favicon = require('express-favicon');
var path = require('path');
var cors = require('cors');
app.use(cors());
const port = process.env.PORT || 8080;
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
var busboy = require('connect-busboy');
app.use(busboy()); 
app.use(express.static(path.join(__dirname, 'build')));
const AWS = require('aws-sdk');
var multer = require('multer');
const fs = require('fs');

//_______________________________________________________________//
configurations.decideMode(parseInt(process.env.MODE,10)); // 1 for localhost 2 for heroku server


Database.startConnection(configurations.getDatabaseConnection());
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
//AWS.config.update({AWS_DEFAULT_REGION : 'eu-west-2'});
AWS.config.update({REGION : 'eu-west-2'});
app.post('/upload',function(req,res){
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
     console.log(req.file.filename);
     var spawn = require("child_process").spawn; 
     var process = spawn('python',["./last_ml.py","uploads/" + req.file.filename] );
                          process.stdout.on('data', function(data) { 
          
                              Database.submitData(data.toString(),req.body.email);
                               console.log(data.toString());
                               res.status(200);
                               res.send(data.toString());
                               process.kill();
                           });
     fs.readFile("./uploads/"+ req.file.filename, (err, data) => {
      if (err) throw err;
      const params = {
          Bucket: 'checkmeplease',
          Key: req.file.filename, 
          Body: data
      };
      s3.upload(params, function(s3Err, data) {
          if (s3Err) throw s3Err
          console.log(`File uploaded successfully at ${data.Location}`);
      });
   });
   });
    });
app.use('/*',Router);
app.post('/getUser',function(req,res){
  var userCred = req.body;
  Database.getUser(userCred,function(status){
    console.log(status);
    if (status === "pass") {
      console.log('success');
    }
    res.send({status:status.toString()});    
  });
  
});
app.post('/newuser',function(req,res){
  Database.addUser(req.body,res);
 });
app.post('/getData',function (req,res) {
  Database.getData(req.body.email,function(result){
    console.log(result);
    res.status(200);
    res.send(result);
  });
});
app.listen(port,function(){
  console.log("Server started on port : "+ port);
});
