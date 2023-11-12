const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    charge: {
        type: Number,
        default: 0
    },
    surcharge: {
        type: Number,
        default: 0
    },
    VAT: {
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


module.exports = mongoose.model("Fee", feeSchema);