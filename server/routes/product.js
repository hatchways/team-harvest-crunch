const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

const User = require("../models/User");
const Product = require("../models/Product");

// @route     POST /product
// @desc      Register a product
// @access    Public
router.post(
    "/product",
    [
        body("title", "Please add title").not().isEmpty(),
        body("price", "Please enter price").not().isEmpty(),
        body("user_id", "Please enter user_id").not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            description,
            price,
            user_id,
            productType,
            photos
        } = req.body;

        try {
            const user = await User.findById(user_id);
            if (!user) {
                return res.status(400).json({ msg: "User doesn't exist" });
            }

            let product = await Product.findOne({
                title: title,
                user_id: user._id
            });

            if (product) {
                return res.status(400).json({ msg: "Product already exists" });
            }

            let photoArray = photos.split(",");

            product = new Product({
                title,
                description,
                price,
                userId: user_id,
                productType,
                photos: photoArray
            });

            await product.save();

            res.json(product);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route     POST /product/:id
// @desc      Update a product's information
// @access    Public
router.post("/product/:id", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        description,
        price,
        user_id,
        productType,
        photos
    } = req.body;

    try {
        const productId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "product_id not valid" });
        }

        let product = await Product.findById(productId);

        if (!product) {
            return res.status(400).json({ msg: "Product doesn't exist" });
        }

        if (title) {
            product.title = title;
        }
        if (description) {
            product.description = description;
        }
        if (price) {
            product.price = price;
        }
        if (user_id) {
            user = await User.findById(user_id);
            product.userId = user._id;
        }
        if (productType) {
            product.productType = productType;
        }
        if (photos) {
            product.photos = photos;
        }

        await product.save();

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route     GET /product/:id
// @desc      Get product information
// @access    Public
router.get("/product/:id", async (req, res) => {
    try {
        let id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "id not valid" });
        }

        let product = await Product.findById(id);

        if (!product) {
            return res.status(400).json({ msg: "Product doesn't exist" });
        }

        res.json(product);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route     GET /product/:shop_id/products
// @desc      Get all products for shop
// @access    Public
router.get("/product/:shop_id/products", async (req, res) => {
    console.log(req.header("x-auth-token"));
    try {
        let id = req.params.shop_id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "id not valid" });
        }

        let products = await Product.find({ userId: id });

        res.json(products);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route     POST/products
// @desc      Get specific page products based on client search
// @access    Public
router.post("/products", async (req, res) => {
    let { limit, page, filters, search } = req.body;
    limit = limit ? parseInt(limit) : 20;
    page = page ? parseInt(page) : 1;
    const startIndex = (page - 1) * limit;
    let findArgs = {};
    if (search) {
        findArgs["title"] = { $regex: search, $options: "i" };
    }
    // req.body = {page:1, filters: {productType:[],price:[]}, search:""}

    for (let key in filters) {
        if (filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: filters[key][0],
                    $lte: filters[key][1]
                };
            } else {
                findArgs[key] = filters[key];
            }
        }
    }

    // findArgs-example = {price:{$gte:0,$lte:20}, productType:["Cake","Cupcake"], title:{ "$regex": "xyz", "$options": "i" }}

    try {
        const size = await Product.countDocuments(findArgs);
        const products = await Product.find(findArgs)
            .select("title price photos productType")
            .skip(startIndex)
            .limit(limit)
            .exec();

        res.json({ size, products });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;
