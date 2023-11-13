const mongoose = require('mongoose');

const processesSchema = new mongoose.Schema({
    branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"
    },
    status: [{
        type: String
    }]
},
    {
        timestamps: true,
    });


module.exports = mongoose.model("Processes", processesSchema);