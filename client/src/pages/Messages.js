import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Conversations from "./Conversations";
import OpenConversation from "./OpenConversation";
import Navbar from "./NavBar";
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(3)
        }
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

const Messages = () => {
    const classes = useStyles();

    return (
        <div>
            <Navbar />
            <Container className={classes.root}>
                <Grid container>
                    <Grid item xs={3}>
                        <Conversations />
                    </Grid>
                    <Grid item xs={9}>
                        <OpenConversation />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Messages;
