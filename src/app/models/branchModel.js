const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({
    manager_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "staff"
    },
    name:{
        type: String,
        required: true
    },
    higherBranch_id:{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "branch"
    },
    postal_code:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model("branch", branchSchema);