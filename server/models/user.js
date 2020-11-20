const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    shopName: {
        type: String,
        default: "Please Add Your Shop Name"
    },
    shopDescription: {
        type: String,
        default: "Please Add Your Shop Information"
    },
    shopCoverPic: {
        type: String,
        default:
            "https://harvestcrunch-bakedgoods.s3-us-east-2.amazonaws.com/5fac90ecf662c13aa4730775/img7.png"
    }
});

module.exports = mongoose.model("user", UserSchema);
