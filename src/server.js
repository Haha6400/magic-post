
const express = require('express'); // requre the express framework
const app = express();
const fs = require('fs'); //require file system object
const errorHandler = require("./app/middleware/errorHandler"); 
const connectDB = require('./config/dbConnection');
const dotenv = require("dotenv").config();

connectDB();
// const staff = require('./models/staff'); //import class staff

app.use(express.json());
app.use(errorHandler);
app.use("/api/accounts", require("./routes/accountRoutes"));


// create a server to listen at port 3000
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API listening at http://%s:%s", host, port)
})
