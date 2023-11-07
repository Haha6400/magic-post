
var express = require('express'); // requre the express framework
var app = express();
var fs = require('fs'); //require file system object

const staff = require('./models/staff'); //import class staff

app.use(express.json());

// create a server to listen at port 3000
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API listening at http://%s:%s", host, port)
})
