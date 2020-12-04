import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import ConversationContext from "./../context/conversationContext";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        display: "flex",
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        zIndex: -5,
    },
    drawerContainer: {
        overflow: "auto"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

const Conversations = () => {
    const {
        loadConversations,
        modifiedconversations,
        setSelectedIndex,
        selectedIndex,
        switchConversation
    } = useContext(ConversationContext);

    useEffect(() => {
        const getAllConversations = async () => {
            await loadConversations();
        };
        getAllConversations();
    }, []);

    const handleOnClick = index => {
        switchConversation(index);
        setSelectedIndex(index);
    };

    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <Divider />
                <List>
                    {modifiedconversations.length > 0 &&
                        modifiedconversations.map((obj, index) => (
                            <ListItem
                                button
                                selected={index === selectedIndex}
                                onClick={() => handleOnClick(index)}
                                key={obj._id}
                            >
                                <ListItemText primary={obj.users[0].name} />
                            </ListItem>
                        ))}
                </List>
                <Divider />
            </div>
        </Drawer>
    );
};

export default Conversations;
