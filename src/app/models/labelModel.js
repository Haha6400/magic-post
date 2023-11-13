const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "order"
    }
    },
    {
        timestamps: true,
    });


module.exports = mongoose.model("label", labelSchema);