import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "./authContext";
import ConversationContext from "./conversationContext";
import SocketContext from "./socketContext";

const ConversationState = props => {
    const [conversations, setConversations] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState();

    const { user } = useContext(AuthContext);
    const socket = useContext(SocketContext);

    const loadConversations = async () => {
        const query = "http://localhost:3001/messenger/conversations";
        try {
            const userId = user._id;
            const result = await axios.post(query, { userId });

            setConversations(result.data.conversations);
        } catch (err) {
            return;
        }
    };

    const sendMessage = text => {
        const users = [user._id, conversations[selectedIndex].users[0]._id];
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

    const switchConversation = index => {
        const conversationId = conversations[index]._id;
        socket.emit("switch-conversation", conversationId);
    };

    useEffect(() => {
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
                modifiedconversations: conversations,
                switchConversation,
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
