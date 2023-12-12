const mongoose = require('mongoose');

const processesSchema = new mongoose.Schema({
    events: [
        {
            branch_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Branch"
            },
            status: {
                type: String
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});


module.exports = mongoose.model("Processes", processesSchema);