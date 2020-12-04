const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationsSchema = mongoose.Schema({
    users: {
        type: [{ type: Schema.Types.ObjectId, ref: "user" }]
    },
    messages: {
        type: [{}]
    }
});

module.exports = mongoose.model("conversations", ConversationsSchema);
