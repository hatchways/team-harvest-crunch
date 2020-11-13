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

        const { title, description, price, user_id, photos } = req.body;

        try {
            let user = await User.findById(user_id);
            if (!user) {
                return res.status(400).json({ msg: "User doesn't exist" });
            }

            let product = await Product.findOne({ title: title, user_id: user._id });

            if (product) {
                return res.status(400).json({ msg: "Product already exists" });
            }


            product = new Product({
                title,
                description,
                price,
                user_id: user._id,
                photos,
            });

            await product.save();

            

            res.json({ id: product.id });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route     POST api/product/:id
// @desc      Update a product's information
// @access    Public
router.post(
    "/:id", async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, price, user_id, photos } = req.body;

        try {
            let product_id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(product_id)){
                return res.status(400).json({ msg: "product_id not valid" });
            }

            let product = await Product.findById(product_id);

            if (!product) {
                return res.status(400).json({ msg: "Product doesn't exist" });
            }

            let user = await User.findById(product.user_id);

            if (title) {product.title = title;}
            if (description) {product.description = description;}
            if (price) {product.price = price;}
            if (user_id) {
                user = await User.findById(user_id);
                product.user_id = user._id;
            }
            if (photos) {product.photos = photos;}

            await product.save();

            res.json({ id: product.id });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route     GET api/product/:id
// @desc      Get product information
// @access    Public
router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)){
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

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ msg: "id not valid" });
        }

        let user = await User.findById(id);

        if (!user) {
             return res.status(400).json({ msg: "User doesn't exist" });
        }

        let products = await Product.find({ user_id: id })

        res.json(products);

    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;