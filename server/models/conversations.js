const mongoose = require("mongoose");

const ConversationsSchema = mongoose.Schema({
  users: {
    type: Array,
  },
  messages: {
    type: [{}],
  },
});

module.exports = mongoose.model("conversations", ConversationsSchema);
