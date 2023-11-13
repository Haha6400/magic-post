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
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer',
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer',
    },
    process_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Process'
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
        required: true,
        ref: "Fee"
    },
    mass_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Mass"
    },
    recerver_fee_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "recever_id"
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("Order", orderSchema);