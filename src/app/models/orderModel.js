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
    special_service: {
        type: String,
    },
    instructions: {
        type: String
    },
    sender_commitment: {
        type: String
    },
    order_code: {
        type: String,
        required: true
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    processes_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Processes'
    },
    fee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fee"
    },
    mass_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mass"
    },
    recerver_fee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recever_id"
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("Order", orderSchema);