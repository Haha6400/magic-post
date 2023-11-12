//REST API demo in Node.js
const express = require('express'); // requre the express framework
const app = express();
const errorHandler = require("./app/middleware/errorHandler"); 
var fs = require('fs'); //require file system object
const connectDB = require('./config/dbConnection');
const dotenv = require("dotenv").config();
const cookieParser = require('cookie-parser');

connectDB();
// const staff = require('./models/staff'); //import class staff

app.use(express.json());
app.use(errorHandler);
app.use("/api/accounts", require("./routes/staffRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/workplace", require("./routes/branchRoutes"));



// create a server to listen at port 3000
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API listening at http://%s:%s", host, port)
})
