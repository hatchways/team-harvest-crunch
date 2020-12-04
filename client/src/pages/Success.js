import React from "react";
import Navbar from "./NavBar";
import { Container, Button, Box, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    rootH1: {
        color: "#4caf50",
        textAlign: "center",
        fontSize: "60px",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    rootH3: {
        textAlign: "center",
        fontSize: "30px",
        marginTop: theme.spacing(1)
    },
    rootButton: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    rootCard: {
        marginTop: theme.spacing(5),
        width: "800px",
        margin: "auto"
    }
}));

export default function Success() {
    const classes = useStyles();
    return (
        <div>
            <Navbar />
            <Container className={classes.rootContainer}>
                <Card className={classes.rootCard}>
                    <CardContent>
                        <h1 className={classes.rootH1}>Purchase Complete!</h1>
                        <h3 className={classes.rootH3}>
                            Thank you for shopping with us.
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
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                className={classes.rootButton}
                                href="/purchase-history"
                            >
                                Purchase History
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}
