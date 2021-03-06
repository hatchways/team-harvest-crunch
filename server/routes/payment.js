const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

const User = require("../models/User");
const Product = require("../models/Product");
const Payment = require("../models/payment");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post(
  "/create-checkout-session",
  [
    body("user_id", "Please add user_id").not().isEmpty(),
    body("product_id", "Please enter product").not().isEmpty(),
  ],
  async (req, res) => {
    const { user_id, product_id } = req.body;

    try {
      const product = await Product.findById(product_id);

      

      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ msg: "user_id not valid" });
      }

      const user = await User.findById(user_id);
      

      const seller = await User.findById(product.userId);

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
          payment_intent_data: {
            transfer_data: {
              destination: seller.stripeAccountId,
            },
          },
        success_url: "http://127.0.0.1:3000/success/",
        cancel_url: "http://127.0.0.1:3000/product/" + product_id,
      });

      const payment = new Payment({
        productId: product._id,
        buyerId: user._id,
        sellerId: product.userId,
        productTitle: product.title,
        price: product.price,
        sessionId: session.id,
      });

      await payment.save();

      res.json(session);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

router.post("/webhook", async (req, res) => {
  const sessionId = req.body.data.object.id;

  try {
    console.log(req.body);
    let payment = await Payment.findOne({ sessionId });

    payment.completePurchase = true;

    await payment.save();

    res.send("Purchase Complete");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/create-stripe-account/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let user = await User.findById(id);
    const account = await stripe.accounts.create({
      type: "custom",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    await stripe.accounts.update(account.id, {
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: "127.0.0.1",
      },
    });
    
    user.stripeAccountId = account.id;
    await user.save();

    res.json(account);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route     GET /purchase-history
// @desc      Get all purchases
// @access    Public
router.get("/purchase-history/:id", async (req, res) => {
  try {
      let id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ msg: "id not valid" });
      }
      let payment = await Payment.find({ buyerId: id, completePurchase: true });

      res.json(payment);
  } catch (err) {
      res.status(500).send("Server Error");
  }
});

module.exports = router;
