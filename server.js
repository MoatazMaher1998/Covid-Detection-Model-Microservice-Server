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
var multer = require('multer');
const fs = require('fs');
var FormData = require('form-data');
const request = require('request')
//_______________________________________________________________//
configurations.decideMode(parseInt(process.env.MODE,10)); // 1 for localhost 2 for heroku server
Database.startConnection(configurations.getDatabaseConnection());
app.post('/upload',function(req,res){
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        console.log(req.file);
        var test = request.post('https://covidapi-alexuni.herokuapp.com/API', function (err, resp, body) {
          if (err) {
            console.log('Error!');
          } else {
            console.log('URL: ' + body);
            res.status(200);
            res.send(body);
          }
        });
        var form = test.form();
        form.append('file', fs.createReadStream(req.file.path));

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
