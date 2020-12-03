import React, { useEffect, useContext, useState } from "react";
import {
    Container,
    Grid,
    Typography,
    AppBar,
    Card,
    TextField,
    FormControlLabel,
    FormLabel,
    Button,
    FormGroup,
    Radio,
    RadioGroup,
    Checkbox,
    CardActionArea
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import ProductContext from "../context/productContext";
import Loading from "./Loading";
import Navbar from "./NavBar";

const useStyles = makeStyles(theme => ({
    rightTopGrid: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: theme.spacing(1),
        textAlign: "center"
    },
    pagination: {
        margin: theme.spacing(2)
    },
    root: {
        "& > *": {
            margin: theme.spacing(3)
        }
    },

    card: {
        height: 319,
        width: 240,
        margin: "auto",
        backgroundSize: "cover"
    },
    emptydiv: {
        marginBottom: theme.spacing(30),
        textAlign: "left"
    }
}));
const limit = 20;

const Home = props => {
    const productContext = useContext(ProductContext);
    const { loadAllProducts, loading } = productContext;
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [state, setState] = useState({
        checkboxList: ["Cake", "Cupcake", "Macarons", "Cookies", "Confections"],
        radioList: [
            { id: 1, name: "Any", value: [] },
            { id: 2, name: "$1 to $20", value: [1, 20] },
            { id: 3, name: "$21 to $40", value: [21, 40] },
            { id: 4, name: "$41 to $60", value: [41, 60] }
        ],
        productType: [],
        price: [],
        search: ""
    });

    useEffect(() => {
        const getAllProducts = async () => {
            const result = await loadAllProducts({});
            // const resultObj = JSON.parse(result);
            const count = Math.ceil(result.size / limit);
            setProducts(result.products);
            setTotalPages(count);
        };
        getAllProducts();
    }, []);

    const classes = useStyles();
    const handleButton = e => {
        props.history.push(`/product/${e.target.id}`);
    };

    const handleChange = async (e, value) => {
        //filterObj-example {limit:20, filters: {productType:[],price:[]}}
        const { productType, price } = { ...state };
        let newPrice = [];
        if (typeof value === "boolean") {
            value
                ? productType.push(e.target.name)
                : productType.splice(productType.indexOf(e.target.name), 1);

            price[0] &&
                price[0] !== "" &&
                price[0].split(",").map(str => newPrice.push(parseInt(str)));
            setState({
                ...state,
                ["productType"]: productType,
                ["search"]: ""
            });
        } else {
            if (value.length > 0) {
                value.split(",").map(str => newPrice.push(parseInt(str)));
            }
            setState({ ...state, [e.target.name]: [value], ["search"]: "" });
        }
        const filterObj = { limit, filters: { productType, price: newPrice } };
        const result = await loadAllProducts(filterObj);
        const count = Math.ceil(result.size / limit);
        setProducts(result.products);
        setTotalPages(count);
        setCurrentPage(1);
    };

    const handlePagination = async (e, page) => {
        const { productType, price, search } = { ...state };
        const newPrice = [];
        price[0] &&
            price[0] !== "" &&
            price[0].split(",").map(str => newPrice.push(parseInt(str)));
        const filterObj = {
            search,
            page,
            limit,
            filters: { productType, price: newPrice }
        };
        console.log(filterObj);
        const result = await loadAllProducts(filterObj);
        setProducts(result.products);
        setCurrentPage(page);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
    const handleSearch = async () => {
        const { productType, price, search } = { ...state };
        const newPrice = [];
        price.length > 0 &&
            price[0].split(",").map(str => newPrice.push(parseInt(str)));

        const filterObj = {
            limit,
            search,
            filters: { productType, price: newPrice }
        };
        console.log(filterObj);
        const result = await loadAllProducts(filterObj);
        const count = Math.ceil(result.size / limit);
        setProducts(result.products);
        setTotalPages(count);
    };

    return (
        <div>
            <Navbar />
            <Container className={classes.root}>
                <h1>Discover Baking Goods</h1>

                <Grid
                    container
                    spacing={3}
                    justify="center"
                    className={classes.rightTopGrid}
                >
                    <Grid item xs={3}>
                        <FormGroup>
                            <FormLabel component="label">
                                PRODUCT TYPE
                            </FormLabel>
                            {state.checkboxList.map(ptype => (
                                <FormControlLabel
                                    key={ptype}
                                    control={
                                        <Checkbox
                                            style={{
                                                color: "ThreeDDarkShadow"
                                            }}
                                            onChange={handleChange}
                                            name={ptype}
                                        />
                                    }
                                    label={ptype}
                                />
                            ))}
                        </FormGroup>
                        <div>
                            <FormLabel component="label">PRICE</FormLabel>
                            <RadioGroup
                                aria-label="PRICE"
                                name="price"
                                value={`${state.price}`}
                                onChange={handleChange}
                            >
                                {state.radioList.map(obj => (
                                    <FormControlLabel
                                        key={obj.id}
                                        value={`${obj.value}`}
                                        control={
                                            <Radio
                                                style={{
                                                    color: "ThreeDDarkShadow"
                                                }}
                                            />
                                        }
                                        label={obj.name}
                                    />
                                ))}
                            </RadioGroup>
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            fullWidth={true}
                            id="search"
                            label="Find you favourite product here"
                            type="search"
                            variant="outlined"
                            value={state.search}
                            onChange={e =>
                                setState({
                                    ...state,
                                    [e.target.id]: e.target.value
                                })
                            }
                        />
                        <Button
                            className={classes.pagination}
                            variant="outlined"
                            size="large"
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            spacing={3}
                        >
                            {loading && <Loading />}
                            {products.map(p => (
                                <Grid key={p._id} item xs={4}>
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
                                                <Typography
                                                    variant="h5"
                                                    component="h2"
                                                >
                                                    {p.title}
                                                </Typography>
                                                <Typography
                                                    variant="h5"
                                                    component="h2"
                                                >
                                                    {"$" + p.price}
                                                </Typography>
                                            </AppBar>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}

                            {!loading && products.length === 0 ? (
                                <Grid
                                    container
                                    justify="center"
                                    className={classes.pagination}
                                >
                                    <FormLabel>
                                        Sorry, No Products Available!!!
                                    </FormLabel>
                                </Grid>
                            ) : (
                                <Grid
                                    container
                                    justify="center"
                                    className={classes.pagination}
                                >
                                    <Pagination
                                        size="large"
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePagination}
                                        variant="outlined"
                                        shape="rounded"
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Home;
