const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderSchema = Schema({
    note: {
        type: String,
        required: [true, "Please add fullname"],
    },
    status: {
        type: String,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
    },
    {
        timestamps: true,
        autoIndex: true
    });

module.exports = mongoose.model("Order", orderSchema);