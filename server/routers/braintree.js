const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Product = require("../models/productModel");
// const { generateToken } = require("./");
const path = require("path");
require("dotenv").config();
const app = express();
const authUser = require("../middleware/authUser.js");

const braintree = require("braintree");
const { generateToken } = require("../index.js");
//connect to braintree

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
exports.generateToken = (req, res) => {
  gateway.clientToken
    .generate({})
    .then((response) => {
      res.status(200).send(response);
      console.log("responseeeeeeeee" + response);
    })
    .catch((err) => res.status(500).send(err));
};
// npm i braintree-web-drop-in-react braintree-web

// router.get("/getToken/:id", authUser, async (req, res) => {
//   // generateToken();
//   const token = req.cookies.token;
//   console.log("TOKEN................." + token);
//   const userId = req.user;
// });
// router.param("userId",authUser=> {

// })
// http://localhost:5000/braintree/generate/token
//https://www.youtube.com/watch?v=6gZjjTYMH-4&ab_channel=LoyalCoder

router.get("/generate/token", generateToken);
router.get("/process/payment", async (req, res) => { console.log("get process payment")});

router.post("/process/payment", async (req, res) => {
  const nonceFromTheClient = req.body.payment_method_nonce;
  const { amount } = req.body;

  gateway.transaction
    .sale({
      amount: amount,
      paymentMethodNonce: nonceFromTheClient,
        // address: address,
        // products: products,

      // deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    })
    .then((response) => {
      console.log(response);
      res.status(200).send(response)
})
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
