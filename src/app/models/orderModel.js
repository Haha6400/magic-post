const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    note: {
        type: String,
        required: [true, "Please add the staff username"],
    },
    },
    {
        timestamps: true,
    });

module.exports = mongoose.model("order", orderSchema);