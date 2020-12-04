import React, { useEffect, useState, useContext } from "react";
import {
    Container,
    Grid,
    AppBar,
    Tabs,
    Tab,
    Button,
    Snackbar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { loadStripe } from "@stripe/stripe-js";
import AuthContext from "../context/authContext";
import MuiAlert from "@material-ui/lab/Alert";
import Navbar from "./NavBar";

function TabPanel(props) {
    const { title, description, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            className={classes.rootTab}
        >
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles(theme => ({
    rootImg: {
        height: "700px"
    },
    rootGrid: {
        marginTop: theme.spacing(6)
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    rootAppBar: {
        backgroundColor: "#FFF",
        color: "#000",
        marginTop: theme.spacing(6)
    },
    rootTab: {
        padding: "20px"
    }
}));

export default function Product(props) {
    const { params } = props.match;
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [images, setImages] = useState([]);
    const stripePromise = loadStripe(
        "pk_test_51HpX21AphDwW8FJot7LQKm65L8nbVCl0QVCcozGsNLh3NOKEgU4aCwsZp859s0QcRJnqyKmtgmotob8WYNzaZ72H00MsyBJwOz"
    );
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const [errorOpen, setErrorOpen] = useState(false);

    useEffect(() => {
        fetch("/product/" + params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(res => {
                return res.json();
            })
            .then(productJSON => {
                setTitle(productJSON.title);
                setDescription(productJSON.description);
                setPrice(productJSON.price);
                setImages(
                    productJSON.photos.map(photo => {
                        return {
                            original: photo,
                            thumbnail: photo
                        };
                    })
                );
            });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlePurchase = async () => {
        const stripe = await stripePromise;

        // Call your backend to create the Checkout Session
        const response = await fetch("/payment/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                user_id: user._id,
                product_id: params.id
            })
        });

        if (response.status === 400) {
            setErrorOpen(true);
        } else {
            const session = await response.json();

            // When the customer clicks on the button, redirect them to Checkout.
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer
                // using `result.error.message`.
            }
        }
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setErrorOpen(false);
    };

    return (
        <div>
            <Navbar />
            <Container>
                <Snackbar
                    open={errorOpen}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="error">
                        Login or Create Account First!
                    </Alert>
                </Snackbar>
                <Grid className={classes.rootGrid} container spacing={10}>
                    <Grid item xs={6}>
                        <ImageGallery
                            lazyLoad
                            items={images}
                            thumbnailPosition="left"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <p>Jeremy Wells</p>
                        <Button variant="contained" color="primary">
                            Contact
                        </Button>
                        <h1>{title}</h1>
                        <p>{description}</p>
                        <h3>CAD {price}.00</h3>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handlePurchase}
                        >
                            PURCHASE PRODUCT
                        </Button>
                    </Grid>
                </Grid>
                <div className={classes.root}>
                    <AppBar className={classes.rootAppBar} position="static">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="simple tabs example"
                            centered
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth
                        >
                            <Tab
                                label="Description"
                                {...a11yProps(0)}
                                fullWidth
                            />
                            <Tab
                                label="Shipping or Delivery"
                                {...a11yProps(1)}
                                fullWidth
                            />
                            <Tab label="Reviews" {...a11yProps(2)} fullWidth />
                        </Tabs>
                    </AppBar>
                    <TabPanel
                        title={title}
                        description={description}
                        value={value}
                        index={0}
                    ></TabPanel>
                    <TabPanel
                        title=""
                        description=""
                        value={value}
                        index={1}
                    ></TabPanel>
                    <TabPanel
                        title=""
                        description=""
                        value={value}
                        index={2}
                    ></TabPanel>
                </div>
            </Container>
        </div>
    );
}
