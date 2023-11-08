//REST API demo in Node.js
const express = require('express'); // requre the express framework
const app = express();
const errorHandler = require("./app/middleware/errorHandler"); 
var fs = require('fs'); //require file system object
// var route = require('./routes')
const connectDB = require('./config/dbConnection');
const dotenv = require("dotenv").config();
const cookieParser = require('cookie-parser');

connectDB();

app.use(express.json());
app.use(errorHandler);

//Configuring cookie-parser
app.use(cookieParser()); 

app.use("/api/accounts", require("./routes/staffRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// create a server to listen at port 3000
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API listening at http://%s:%s", host, port)
})
