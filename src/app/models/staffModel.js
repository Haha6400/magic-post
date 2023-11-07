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
        type: String,
        required: [true, "Please add password"],
    },
    workplace: {
        type: String,
        required: [true, "Please add the staff workplace"],
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