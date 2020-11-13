import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  rootHeader: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
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
          <Button color="inherit">MY SHOP</Button>
          <Button color="inherit">MY ACCOUNT</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
