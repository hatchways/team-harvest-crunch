import React from "react";
import Navbar from "./NavBar";
import { Container, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    rootH1: {
        color: "#4caf50",
        textAlign: "center",
        fontSize: "60px",
        marginBottom: theme.spacing(1),
    },
    rootH3: {
        textAlign: "center",
        fontSize: "30px",
        marginTop: theme.spacing(1)
    },
    rootButton: {
        marginTop: theme.spacing(6),
    }
}));

export default function Success() {
    const classes = useStyles();
    return (
        <div>
            <Navbar />
            <Container className={classes.rootContainer}>
                <h1 className={classes.rootH1}>Success!</h1>
                <h3 className={classes.rootH3}>
                    Thank you for making a purchase with us.
                </h3>
                <Box textAlign="center">
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.rootButton}
                        href="/"
                    >
                        Return Home
                    </Button>
                </Box>
            </Container>
        </div>
    );
}
