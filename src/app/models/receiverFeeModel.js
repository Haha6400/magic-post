const mongoose = require('mongoose');

const receiverFeeSchema = new mongoose.Schema({
    cod: {
        type: Number,
        default: 0
    },
    other_fee: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    }
    },
    {
        timestamps: true,
    });


module.exports = mongoose.model("Receiver_fee", receiverFeeSchema);