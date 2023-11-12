const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
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


module.exports = mongoose.model("Package", packageSchema);