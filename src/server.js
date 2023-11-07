//REST API demo in Node.js
const express = require('express'); // requre the express framework
const app = express();
const errorHandler = require("./app/middleware/errorHandler");
var fs = require('fs'); //require file system object
const dotenv = require('dotenv').config()
const connectDB = require('./config/dbConnection')

connectDB();
// const staff = require('./models/staff'); //import class staff

app.use(express.json());
app.use("/api/accounts", require("./routes/staffRoutes"));
app.use('/api/orders', require("./routes/customerRoutes"))
app.use(errorHandler);

// create a server to listen at port 3000
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("REST API listening at http://%s:%s", host, port)
})
