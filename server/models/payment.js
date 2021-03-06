const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    buyerId: {
        type: String,
        required: true,
    },
    sellerId: {
        type: String,
        required: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
    completePurchase: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        required: true,
    },
    productTitle: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("payment", PaymentSchema);