const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    user_id: {
        type: mongoose.ObjectId,
        required: true,
    },
    photos: {
        type: [String],
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("product", ProductSchema);