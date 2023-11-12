const mongoose = require('mongoose');

const massSchema = new mongoose.Schema({
    actual: {
        type: Number,
        default: 0
    },
    converted: {
        type: Number,
        default: 0
    }
    },
    {
        timestamps: true,
    });


module.exports = mongoose.model("Mass", massSchema);