const mongoose = require('mongoose');

const processSchema = new mongoose.Schema({
    order_id:{
        type: StaticRange,
        required: true,
        ref: "order"
    },
    branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "branch"
    },
    status:{
        type: String,
        default: "begin transported"
    }},
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Process", processSchema);