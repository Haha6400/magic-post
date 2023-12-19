const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    token: {
        type: String
    },
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("token", tokenSchema);