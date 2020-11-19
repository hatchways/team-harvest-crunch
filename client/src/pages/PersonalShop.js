import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  AppBar,
  Card,
  CardMedia,
  Button,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";

import img1 from "../images/img1.png";
import img7 from "../images/img7.png";
// import AuthContext from "../context/authContext";

const useStyles = makeStyles((theme) => ({
  bottomGrid: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(10),
  },
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
    textAlign: "center",
  },

  card: {
    height: 319,
    width: 240,
    margin: "auto",
    backgroundImage: `url(${img1})`,
    backgroundSize: "cover",
  },
  cardContent: {
    margin: theme.spacing(5),
  },
  emptydiv: {
    marginBottom: theme.spacing(30),
    textAlign: "left",
  },
  coverPhoto: {
    height: 400,
    width: "100%",
    backgroundImage: `url(${img7})`,
    objectFit: "cover",
  },
  shopInfo: {
    height: 400,
    width: "100%",
    objectFit: "cover",
    backgroundColor: "#e8eaf6",
  },
  margin: {
    margin: theme.spacing(3),
  },
}));

const PersonalShop = () => {
  //   const authContext = useContext(AuthContext);
  //   const { user } = authContext;
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [shopPhoto, setShopPhoto] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setShopName("MAPLE BAKERY");
    setShopDescription("Welcome to MAPLE BAKERY");
    setShopPhoto("https://picsum.photos/200/300");
    setProducts([
      {
        title: "product01",
        price: 10,
        photos: ["https://picsum.photos/200/300"],
      },
      {
        title: "product02",
        price: 20,
        photos: ["https://picsum.photos/200/300"],
      },
      {
        title: "product03",
        price: 30,
        photos: ["https://picsum.photos/200/300"],
      },
      {
        title: "product04",
        price: 40,
        photos: ["https://picsum.photos/200/300"],
      },
      {
        title: "product05",
        price: 50,
        photos: ["https://picsum.photos/200/300"],
      },
      {
        title: "product06",
        price: 60,
        photos: ["https://picsum.photos/200/300"],
      },
    ]);
  }, []);

  const classes = useStyles();

  return (
    <Container maxWidth={"xl"} className={classes.root}>
      <Grid container alignItems="center" spacing={0}>
        <Grid item xs={5}>
          <Card elevation={3} className={classes.shopInfo}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h2">
                {shopName}
              </Typography>
              <Typography
                variant="body1"
                component="h4"
                className={classes.margin}
              >
                {shopDescription}
              </Typography>
              <Button variant="outlined" className={classes.margin}>
                CONTACT OWNER
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={7}>
          <Card elevation={3} className={classes.coverPhoto}>
            <div style={{ textAlign: "left" }}>
              <Button variant="outlined" color="secondary">
                EDIT COVER
              </Button>
            </div>
            {/* we can also set conver pic here instead of background img<CardMedia className={classes.coverMedia} image={img7}></CardMedia> */}
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        spacing={7}
        className={classes.bottomGrid}
      >
        {products.map((p) => (
          <Grid key={p.title} item xs={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <div className={classes.emptydiv}>
                  <FavoriteBorderIcon />
                </div>
                <AppBar position="static">
                  <Typography variant="h5" component="h2">
                    {p.title}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {"$" + p.price}
                  </Typography>
                </AppBar>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PersonalShop;
