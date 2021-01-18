var cmd = require('node-cmd');
var database = "";
var server = "";


function decideMode(mode){
if(mode === 1 ){
        console.log("Building Started .. \n Please Wait");
        cmd.runSync('react-scripts build');
        database = process.env.LOCALDATABASE;
        server = process.env.LOCALSERVER;
    console.log("App Running On Localhost Configurations");}
if(mode === 2 ){
    
    database = process.env.SERVERDATABASE;
    server = process.env.SERVER;
    
    console.log("App running on heroku server config");}
}


function getDatabaseConnection(){
    return database;}
function getServerConnection(){
    return server;
}
module.exports = {getDatabaseConnection, getServerConnection, decideMode};
