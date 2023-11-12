const mongoose = require('mongoose');

const workplaceSchema = mongoose.Schema({
    manager_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "staff"
    },
    name:{
        type: String,
        required: true
    },
    higherWorkplace_id:{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "workplace"
    }
});
module.exports = mongoose.model("Workplace", workplaceSchema);