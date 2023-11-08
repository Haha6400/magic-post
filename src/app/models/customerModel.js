const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Please add fullname"],
    },
    address: {
        type: String,
        required: [true, "Please add the address"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add phone number"],
    },
    zipCode: {
        type: String,
        required: [true, "Please add the zipcode"],
    }
    },
    {
        timestamps: true,
    });


module.exports = mongoose.model("Customer", customerSchema);