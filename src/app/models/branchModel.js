const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({
    manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "staff"
    },
    name: {
        type: String,
        required: true
    },
    higherBranch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branch"
    },
    higherBranchName: {
        type: String
    },
    lowerBranchName: {
        type: Array
    },
    postal_code: {
        type: String
    }
});
module.exports = mongoose.model("branch", branchSchema);