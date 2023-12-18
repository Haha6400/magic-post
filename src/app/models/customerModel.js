const { required } = require('joi');
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
    branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true]
    },
    },
    {
        timestamps: true,
    });


module.exports = mongoose.model("Customer", customerSchema);