//REST API demo in Node.js
var express = require('express'); // requre the express framework
var app = express();
var fs = require('fs'); //require file system object
var route = require('./routes')

//Parse data stream from client
app.use(express.json())
route(app)

// Create a server to listen at port 3000
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API listening at http://%s:%s", host, port)
})