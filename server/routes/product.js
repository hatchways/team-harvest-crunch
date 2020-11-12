const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

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
        body("username", "Please enter username").not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, price, username, photos } = req.body;

        try {
            let user = await User.findOne({ name: username });

            if (!user) {
                return res.status(400).json({ msg: "User doesn't exist" });
            }

            let user_id = user._id;

            let product = await Product.findOne({ title: title, user: user_id });

            if (product) {
                return res.status(400).json({ msg: "Product already exists" });
            }

            product = new Product({
                title,
                description,
                price,
                user_id,
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

// @route     GET api/product/:username/:product
// @desc      Get product information
// @access    Public
router.get("/:username/:product", async (req, res) => {
    try {
        let username = req.params.username;
        let productName = req.params.product;

        let user = await User.findOne({ name: username });

        if (!user) {
            return res.status(400).json({ msg: "User doesn't exist" });
        }

        let product = await Product.findOne({ title: productName, user_id: user._id });

        if (!product) {
            return res.status(400).json({ msg: "Product doesn't exist" });
        }

        res.json({
            title: product.title,
            description: product.description,
            price: product.price,
            user: user.name,
            photos: product.photos,
        })

    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;