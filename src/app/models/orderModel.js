const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({ 
    note: {
        type: String,
        default: "................................................................................................................................"
    },
    special_service: {
        type: String,
        default: "................................................................................................................................"
    },
    instructions: {
        type: String,
        default: "................................................................................................................................"
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
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    },
    processes_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Processes'
    },
    fee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fee"
    },
    recerver_fee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receiver_fee",
        default: "65520429d999906be32cd9e1"
    },
    is_returned: {
        type: Boolean,
        default: false
    },
    endedAt: {
        type: mongoose.Schema.Types.Date
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("Order", orderSchema);