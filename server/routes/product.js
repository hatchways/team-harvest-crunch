const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

const User = require("../models/User");
const Product = require("../models/Product");

// @route     POST api/product
// @desc      Register a product
// @access    Public
router.post(
    "/",
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

// @route     POST api/product/:id
// @desc      Update a product's information
// @access    Public
router.post("/:id", async (req, res) => {
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

// @route     GET api/product/:id
// @desc      Get product information
// @access    Public
router.get("/:id", async (req, res) => {
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

// @route     GET api/product/:shop_id/products
// @desc      Get all products for shop
// @access    Public
router.get("/:shop_id/products", async (req, res) => {
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

// @route     POST product/pagination/products
// @desc      Get specific page products based on client search
// @access    Public
router.post("/pagination/products", async (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let page = req.body.page ? parseInt(req.body.page) : 1;
    let search = req.body.search;
    const startIndex = (page - 1) * limit;
    let findArgs = {};
    if (search) {
        findArgs["title"] = { $regex: search, $options: "i" };
    }
    // req.body = {page:1, filters: {productType:[],price:[]}, search:""}

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
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
