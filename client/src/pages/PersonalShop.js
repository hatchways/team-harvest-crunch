import React, { useEffect, useContext } from "react";
import {
    Container,
    Grid,
    Typography,
    AppBar,
    Card,
    Button,
    CardContent,
    CardActions,
    CardActionArea
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../context/authContext";
import ProductContext from "../context/productContext";

const useStyles = makeStyles(theme => ({
    bottomGrid: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: theme.spacing(10)
    },
    root: {
        "& > *": {
            margin: theme.spacing(0)
        },
        textAlign: "center"
    },

    card: {
        height: 319,
        width: 240,
        margin: "auto",
        backgroundSize: "cover"
    },
    cardContent: {
        margin: theme.spacing(5)
    },
    emptydiv: {
        marginBottom: theme.spacing(30),
        textAlign: "left"
    },
    coverPhoto: {
        height: 400,
        width: "100%",
        objectFit: "cover"
    },
    shopInfo: {
        height: 400,
        width: "100%",
        objectFit: "cover",
        backgroundColor: "#e8eaf6"
    },
    margin: {
        margin: theme.spacing(3)
    }
}));

const PersonalShop = props => {
    const authContext = useContext(AuthContext);
    const productContext = useContext(ProductContext);
    const { user } = authContext;
    const { products, loadProducts } = productContext;

    useEffect(() => {
        const userId = user._id;
        if (userId) {
            loadProducts(userId);
        }
    }, [user]);

    const classes = useStyles();
    const handleButton = e => {
        props.history.push(`/product/${e.target.id}`);
    };

    return (
        <Container maxWidth={"xl"} className={classes.root}>
            <Grid container alignItems="center" spacing={0}>
                <Grid item xs={5}>
                    <Card elevation={3} className={classes.shopInfo}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="h5" component="h2">
                                {user.shopName}
                            </Typography>
                            <Typography
                                variant="body1"
                                component="h4"
                                className={classes.margin}
                            >
                                {user.shopDescription}
                            </Typography>
                            <Button
                                variant="outlined"
                                className={classes.margin}
                            >
                                CONTACT OWNER
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={7}>
                    <Card
                        elevation={3}
                        className={classes.coverPhoto}
                        style={{
                            backgroundImage: `url(${user.shopCoverPic})`
                        }}
                    >
                        <div style={{ textAlign: "left" }}>
                            <Button variant="outlined" color="secondary">
                                EDIT COVER
                            </Button>
                        </div>
                    </Card>
                </Grid>
            </Grid>
            <Grid
                container
                alignItems="center"
                spacing={7}
                className={classes.bottomGrid}
            >
                {!products ? (
                    <Grid item xs={12}>
                        <Button variant="outlined" size="large">
                            CREATE PRODUCT
                        </Button>
                    </Grid>
                ) : (
                    products.map(p => (
                        <Grid key={p._id} item xs={3}>
                            <Card
                                className={classes.card}
                                style={{
                                    backgroundImage: `url(${p.photos[0]})`
                                }}
                            >
                                <CardActionArea
                                    onClick={e => handleButton(e)}
                                    id={p._id}
                                >
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
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default PersonalShop;
