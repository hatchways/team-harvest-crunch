import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";

import Conversations from "./Conversations";
import OpenConversation from "./OpenConversation";
import SocketState from "./../context/socketState";
import ConversationState from "./../context/conversationState";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

const Messages = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Conversations />
            <OpenConversation />
        </div>
    );
};

export default Messages;
