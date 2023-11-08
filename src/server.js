//REST API demo in Node.js
const express = require('express'); // requre the express framework
const app = express();
const errorHandler = require("./app/middleware/errorHandler"); 
var fs = require('fs'); //require file system object
const connectDB = require('./config/dbConnection');
const dotenv = require("dotenv").config();

connectDB();
app.use(errorHandler);

// const staff = require('./models/staff'); //import class staff
app.use(express.json());
app.use("/api/accounts", require("./routes/staffRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));



// create a server to listen at port 3000
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API listening at http://%s:%s", host, port)
})
