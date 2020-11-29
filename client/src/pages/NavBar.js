import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AuthContext from "../context/authContext";

const useStyles = makeStyles(theme => ({
    rootHeader: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    color: {
        color: "White"
    }
}));

export default function Navbar() {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const { logout } = authContext;

    function handleLogout() {
        logout();
    }

    return (
        <div className={classes.rootHeader}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        HARVEST CRUNCH BAKERY
                    </Typography>
                    <Button color="inherit">SHOP</Button>
                    <Button color="inherit">MESSAGES</Button>
                    <Button color="inherit">MY FAVOURITES</Button>
                    <Link to="/personal-shop">
                        <Button className={classes.color}>MY SHOP</Button>
                    </Link>
                    <Link to="/shop-profile">
                        <Button className={classes.color}>MY ACCOUNT</Button>
                    </Link>
                    <Button color="inherit" onClick={handleLogout}>LOGOUT</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
