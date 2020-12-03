const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Conversations = require("../models/conversations");

// @route     POST messenger/conversations
// @desc      add/update specific conversation
// @access    Public
router.post("/addUpdateConversation", async (req, res) => {
    //example { id: "", users: ["senderId", "receiverId"], messages: {senderId:"", msg:""} }
    const { users, messageObj } = req.body;
    const filterObj = {};
    filterObj["users"] = users;
    let conversation = await Conversations.find(filterObj);
    if (conversation.length > 0) {
        conversation[0].messages.push(messageObj);
        const updatedConversation = conversation[0];
        console.log(updatedConversation);
        conversation = updatedConversation;
    } else {
        conversation = new Conversations({ users, messages: [messageObj] });
    }
    try {
        await conversation.save();
        const { messages, _id } = conversation;
        res.status(201).json({
            conversationId: _id,
            lastmsg: messages[messages.length - 1]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route     POST messenger/conversations
// @desc      Get all conversations that has common specific user
// @access    Public
router.post("/conversations", async (req, res) => {
    //example { id: "", users: ["senderId", "receiverId"], messages: {senderId:"", msg:""} }
    const id = req.body.userId;
    const filterObj = {};
    filterObj["users"] = id;
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ msg: "id not valid" });
    // }
    try {
        const conversations = await Conversations.find(filterObj);
        res.status(200).json({ conversations });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
