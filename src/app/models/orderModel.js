const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    type: { // docs or goods
        type: String,
        required: [true, "Type of parcel"]
    },
    note: {
        type: String,
        required: [true, "Please add fullname"],
    },
    status: {
        type: String,
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    special_service: {
        type: String,
    },
    instructions: {
        type: String
    },
    sender_commitment: {
        type: String
    },
    fee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fee"
    },
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Package"
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("Order", orderSchema);