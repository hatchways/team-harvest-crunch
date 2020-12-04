import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Snackbar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AuthContext from "../context/authContext";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
    rootHeader: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        "& > *": {
            color: "#FFFFFF"
        }
    },
    color: {
        color: "White"
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Navbar() {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const { logout, isAuthenticated } = authContext;
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    function handleLogout() {
        logout();
        handleClick();
    }

    return (
        <div className={classes.rootHeader}>
            <AppBar position="static">
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical:"top", horizontal:"center" }}
                >
                    <Alert onClose={handleClose} severity="success">
                        Logged Out!
                    </Alert>
                </Snackbar>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        className={classes.title}
                        InputProps={{ disableUnderline: true }}
                    >
                        <Link to="/" style={{ textDecoration: "none" }}>
                            HARVEST CRUNCH BAKERY
                        </Link>
                    </Typography>
                    <Link to="/">
                        <Button className={classes.color}>SHOP</Button>
                    </Link>
                    {isAuthenticated ? (
                        <div>
                            <Button color="inherit">MESSAGES</Button>
                            <Link to="/purchase-history">
                                <Button className={classes.color}>
                                    PURCHASE HISTORY
                                </Button>
                            </Link>
                            <Link to="/personal-shop">
                                <Button className={classes.color}>
                                    MY SHOP
                                </Button>
                            </Link>
                            <Link to="/shop-profile">
                                <Button className={classes.color}>
                                    MY ACCOUNT
                                </Button>
                            </Link>
                            <Link to="/create-product">
                                <Button className={classes.color}>
                                    CREATE PRODUCT
                                </Button>
                            </Link>
                            <Button color="inherit" onClick={handleLogout}>
                                LOGOUT
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">
                                <Button className={classes.color}>LOGIN</Button>
                            </Link>
                            <Link to="/register">
                                <Button className={classes.color}>
                                    REGISTER
                                </Button>
                            </Link>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
