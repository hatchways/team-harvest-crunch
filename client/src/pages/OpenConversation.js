import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ConversationContext from "../context/conversationContext";

const OpenConversation = () => {
    const [text, setText] = useState("");

    const { selectedConversation, selectedIndex, sendMessage } = useContext(
        ConversationContext
    );

    const handleSubmit = e => {
        e.preventDefault();
        sendMessage(text);
        setText("");
    };
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {Object.keys(selectedConversation).length > 0 &&
                        selectedConversation.messages.map(
                            (messageObj, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            className={`rounded px-2 py-1 bg-primary text-white`}
                                        >
                                            {messageObj.msg}
                                        </div>
                                        <div className="text-muted small">
                                            {messageObj.senderId}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                </div>
            </div>
            {(selectedIndex || selectedIndex == 0) && (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label={"Type here!!!"}
                        style={{ margin: 8 }}
                        fullWidth={true}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Send
                    </Button>
                </form>
            )}
        </div>
    );
};

export default OpenConversation;
