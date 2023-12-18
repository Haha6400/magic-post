const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please add the staff username"],
    },
    email: {
        type: String,
        required: [true, "Please add the staff email"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add the staff phone number"],
    },
    password: {
        type: String
    },
    branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "branch"
    },
    role: {
        type: String,
        required: [true, "Please add the staff role"],
    }
    },
    {
        timestamps: true,
    });


module.exports = mongoose.model("staff", staffSchema);