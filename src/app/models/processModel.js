const mongoose = require('mongoose');

const processSchema = new mongoose.Schema({
    amount: {
        type: Number,
    },
    price: {
        type: Number,
    },
    mass: {
        type: Number,
    }
    },
    {
        timestamps: true,
    });


module.exports = mongoose.model("Process", processSchema);