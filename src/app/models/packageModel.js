const mongoose = require('mongoose')

const packageSchema = mongoose.Schema({
    type: { // docs or goods
        type: String,
        required: [true, "Type of parcel"]
    },
    amount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    mass_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mass"
    },
})

module.exports = mongoose.model("Package", packageSchema);