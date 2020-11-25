const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

const User = require("../models/User");
const Product = require("../models/Product");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post(
  "/create-checkout-session",
  [
    body("user_id", "Please add user_id").not().isEmpty(),
    body("product_id", "Please enter product").not().isEmpty(),
  ],
  async (req, res) => {
    const { user_id, product_id } = req.body;

    const product = await Product.findById(product_id);

    if (!mongoose.Types.ObjectId.isValid(user_id)){
        return res.status(400).json({ msg: "user_id not valid" });
    }

    const user = await User.findById(user_id);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          name: product.title,
          amount: product.price * 100,
          currency: "cad",
          quantity: 1,
        },
      ],
      //   payment_intent_data: {
      //     application_fee_amount: 0,
      //     transfer_data: {
      //       destination: "acct_1HqpwNPL3lnSgRx7",
      //     },
      //   },
      success_url: "http://127.0.0.1:3000/product/" + product_id,
      cancel_url: "http://127.0.0.1:3000/product/" + product_id,
    });
    res.json(session);
  }
);

module.exports = router;
