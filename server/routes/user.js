const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const auth = require("../middleware/auth");

// @route     POST user/register
// @desc      Register a user & get token
// @access    Public
router.post(
    "/register",
    [
        body("name", "Please add name").not().isEmpty(),
        body("email", "Please include a valid email").isEmail(),
        body(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: "User already exists" });
            }

            user = new User({
                name,
                description,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route     GET user/login
// @desc      Get logged in user
// @access    Private
router.get("/login", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route     POST user/getUserById
// @desc      Get user info by Id
// @access    Public
router.get("/getUserById/:userId", async (req, res) => {
    const id = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "id not valid" });
    }
    try {
        const user = await User.findById(id).select("name");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route     POST user/login
// @desc      Auth user & get token
// @access    Public
router.post(
    "/login",
    [
        body("email", "Please include a valid email").isEmail(),
        body("password", "Password is required").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route     PUT user/shop
// @desc      Update a Shopinfo
// @access    Private
router.put(
    "/shop",
    auth,
    [
        body("shopName", "Please Add Your Shop Name").not().isEmpty(),
        body("shopDescription", "Please Add Your Shop Information")
            .not()
            .isEmpty(),
        body("shopCoverPic", "Please Attach The Cover Pic Of Your Shop")
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { shopName, shopDescription, shopCoverPic } = req.body;

        try {
            let user = await User.findById(req.user.id);

            if (!user) {
                return res.status(400).json({ msg: "User doesn't exist" });
            }

            user.shopName !== shopName && (user.shopName = shopName);
            user.shopDescription !== shopDescription &&
                (user.shopDescription = shopDescription);
            user.shopCoverPic !== shopCoverPic &&
                (user.shopCoverPic = shopCoverPic);

            await user.save();

            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route     PUT user/shop
// @desc      Update a Shopinfo
// @access    Private
router.put("/addConversation", async (req, res) => {
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { conversation } = req.body;

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({ msg: "User doesn't exist" });
        }

        user.conversation !== shopName && (user.shopName = shopName);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
module.exports = router;
