const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Please add the staff username"],
    },
    address: {
        type: String,
        required: [true, "Please add the staff email"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add the staff phone number"],
    },
    zipcode: {
        type: String,
        required: [true, "Please add the staff workplace"],
    },
    },
    {
        timestamps: true,
    });


module.exports = mongoose.model("Customer", customerSchema);