import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

import AuthContext from "./authContext";
import ConversationContext from "./conversationContext";
import SocketContext from "./socketContext";

const ConversationState = props => {
    const [conversations, setConversations] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { user } = useContext(AuthContext);
    const socket = useContext(SocketContext);

    const loadConversations = async () => {
        const query = "http://localhost:3001/messenger/conversations";
        try {
            const userId = user._id;
            console.log(userId);
            const result = await axios.post(query, { userId });

            setConversations(result.data.conversations);
        } catch (err) {
            return;
        }
    };

    const sendMessage = text => {
        const { users } = conversations[selectedIndex];
        const messageObj = { senderId: user._id, msg: text };
        socket.emit("send-message", { users, messageObj });
    };

    const addMessageToConversation = ({ conversationId, users, lastmsg }) => {
        setConversations(prevConversations => {
            let existingConversation = false;
            const updatedConversations = prevConversations.map(
                conversationObj => {
                    if (conversationObj._id === conversationId) {
                        existingConversation = true;
                        return {
                            ...conversationObj,
                            messages: [...conversationObj.messages, lastmsg]
                        };
                    }

                    return conversationObj;
                }
            );
            console.log(existingConversation);
            if (existingConversation) {
                return updatedConversations;
            } else {
                return [
                    ...prevConversations,
                    { _id: conversationId, users, messages: [lastmsg] }
                ];
            }
        });
    };

    useEffect(() => {
        console.log(socket);
        if (socket) {
            socket.on("receive-message", ({ conversationId, users, lastmsg }) =>
                addMessageToConversation({ conversationId, users, lastmsg })
            );
        }
    }, [socket]);

    return (
        <ConversationContext.Provider
            value={{
                loadConversations,
                conversations,
                selectedConversation: conversations[selectedIndex] || {},
                selectedIndex,
                setSelectedIndex,
                sendMessage
            }}
        >
            {props.children}
        </ConversationContext.Provider>
    );
};

export default ConversationState;
