import React, { useEffect, useState } from "react";
import { Container, Grid, AppBar, Tabs, Tab, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

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
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    rootImg: {
        height:"700px",
    },
    rootGrid: {
        marginTop: theme.spacing(6),
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    rootAppBar: {
        backgroundColor: "#FFF",
        color: '#000',
        marginTop: theme.spacing(6),
    },
    rootTab: {
        padding: "20px",
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

    useEffect(() => {
        fetch("/product/" + params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
            .then(res => {
                return res.json();
            })
            .then(productJSON => {
                setTitle(productJSON.title);
                setDescription(productJSON.description);
                setPrice(productJSON.price);
                setImages(productJSON.photos.map(photo => {
                    return {
                    "original": photo,
                    "thumbnail": photo}
                }));
            })
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Grid className={classes.rootGrid} container spacing={10}>
                <Grid item xs={6}>
                    <ImageGallery lazyLoad items={images} thumbnailPosition="left"/>;
                </Grid>
                <Grid item xs={6}>
                    <p>Jeremy Wells</p>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <h3>CAD {price}.00</h3>
                    <Button variant="contained" color="primary" size="large">ADD TO CART</Button>
                </Grid>
            </Grid>
            <div className={classes.root}>
                <AppBar className={classes.rootAppBar} position="static">
                    <Tabs value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        centered
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Description" {...a11yProps(0)} fullWidth />
                        <Tab label="Shipping or Delivery" {...a11yProps(1)} fullWidth />
                        <Tab label="Reviews" {...a11yProps(2)} fullWidth />
                    </Tabs>
                </AppBar>
                <TabPanel title={title} description={description} value={value} index={0}>
                </TabPanel>
                <TabPanel title="" description="" value={value} index={1}>
                </TabPanel>
                <TabPanel title="" description="" value={value} index={2}>
                </TabPanel>
            </div>
        </Container>
    );
}