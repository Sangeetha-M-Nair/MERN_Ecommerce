const router = require("express").Router();
const express = require("express");
const path = require("path");
const app = express();
const jwt = require("jsonwebtoken");

const Merchant = require("../models/merchantModel");
const User = require("../models/userModel");
const authUser = require("../middleware/authUser.js");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const { db } = require("../models/cartModel");
const { ObjectId } = require("mongodb");

router.get("/items", authUser, async (req, res, next) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const products = await Cart.find({ user: req.user });

    //validation
    if (!productId)
      return res.status(400).json({
        errorMessage: "product id not given ..please contact developer",
      });

    res.json(products);
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

// router.get('/add-to-cart/:id', (req, res) => {

// })

router.post("/addItems/:id", authUser, async (req, res, next) => {
  try {
    const { user, quantity } = req.body;
    const productId = req.params.id;
    console.log(productId);
    console.log("user" + user);

    let userId = req.user;
    console.log("userId" + userId);

    let params = {
      userId,
    };
    Cart.findOne(params, (err, userDoc) => {
      // query the corresponding user information
      if (err) {
        res.json({
          status: 1,
          msg: err.message,
        });
      } else {
        if (userDoc) {
          let inCart = false;
          userDoc.cartItems.forEach(function (item) {
            // traverse cartItems to compare commodity ID
            if (item.productId == productId) {
              // if the goods are in the shopping cart, the quantity will increase
              inCart = true;
              item.quantity++;
              const newCart = new cartItems(userDoc, res);
              const cart = new Cart(newCart);
              const savedCart = cart.save();
            }
          });
          //If the selected item is not in the shopping cart, search from the item list and add it to the shopping cart
          if (!inCart) {
            Product.findOne({ productId }, (err, goodsDoc) => {
              if (err) {
                res.json({
                  status: 1,
                  msg: err.message,
                });
              } else {
                goodsDoc.checked = true;
                goodsDoc.quantity = 1;
                userDoc.cartItems.push(goodsDoc); // insert the product into the user's cartItems array
                console.log(userDoc.cartItems);
                const newCart = new cartItems(userDoc, res);
                const cart = new Cart(newCart);
                const savedCart = cart.save();
              }
            });
          }
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// router.post("/addItems/:id", authUser, async (req, res) => {
//   try {
//     const productId = req.params.id;

//     const token = req.cookies.token;
//     console.log(token);

//     const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("validatedUser" + validatedUser.id);
//     req.user = validatedUser.id;

//     const originalProduct = await Product.findById(productId);
//     const cartProduct = await Cart.findById(productId);
//     // const userExisting = await Cart.find({ user: req.user });
//     // const user = originalProduct.req.user;
//     const existingUser = await Cart.findOne({ user: req.user });
//     //  if (originalProduct.user.toString() == req.user)
//     console.log("existingUser............" + existingUser);
//     Cart.findOne({ user: req.user })
//       .then((cart) => {
//         if (cart) {
//           if (cartProduct) {
//             let quantity = quantity + 1;
//             let price = price * price;
//             let cartObj = new Cart(req.user,{productId, quantity, price});
//             cartObj.save();
//           } else {
//             let price = originalProduct.price;
//             let quantity = 1;
//             let cartObj = new Cart(req.user, {productId, quantity, price});
//             cartObj.save();
//           }
//         } else {
//           let price = originalProduct.price;
//           let quantity = 1;
//           let cartObj = new Cart(req.user,{productId, quantity, price});
//           cartObj.save();
//         }
//       })
//       .catch((error) => console.log(error));
//   } catch (err) {
//         return res.json(null);

//     console.log(err);
//   }
// });

// router.post("/addItems/:id", authUser, async (req, res) => {
//   try {const { user, quantity } = req.body;
//     const productid = req.params.id;
//     console.log(productid);
//     Cart.find({ user}).exec((error, cart) => {
//       if (error) return res.status(400).json({ error });
//       if (cart) {

//         //if exists update cart
//         // const productId = req.body.productid;
//         console.log("product+================"+productid);
//         const item = cart.find((c) => c.productid == productid);
//         if (item) {
//           console.log(item);
//           Cart.findOneAndUpdate(
//             { user: req.user.id, "cartItems.productId": productid },
//             {
//               $set: {
//                 "cartItems": {
//                   ...req.body.cartItems,
//                   quantity: item.quantity + req.body.cartItems.quantity,
//                 },
//               },
//             }
//           ).exec((error, _cart) => {
//             if (error) return res.status(400).json({ error });
//             if (_cart) {
//               return res.status(201).json({ cart: _cart });
//                       console.log("##################" + cartItems);

//             }
//           });
//         } else {
//                       console.log("hi");

//           Cart.findOneAndUpdate(
//             { user: req.user._id },
//             {
//               $push: { quantity: 1, productId: productid },
//             }
//           ).exec((error, _cart) => {
//             if (error) return res.status(400).json({ error });
//             if (_cart) {
//               return res.status(201).json({ cart: _cart });
//             }
//           });
//         }
//         // res.status(200).json({ message: Cart });
//       } else {
//         //if

//         const cart = new Cart({
//           user: req.user.id,
//           // cartItems: req.body.cartItems,
//           quantity: 1,
//           productId:productid
//         });
//         console.log("##################"+cartItems);
//         cart.save((error, cart) => {
//           if (error) return res.status(400).json({  errorMessage:"error" });
//           if (cart) {
//             return res
//               .status(201)
//               .json({ cart });
//           }
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ errorMessage:"Something went wrong"});
//   }
// });

// router.post("/addItems/:id", authUser, async (req, res) => {
//   try {
//     const { user, quantity } = req.body;

//     const productId = req.params.id;
//     console.log("producttttttttttttis" + productId);

//     const existingProduct = await Product.findById({ _id: productId });
//     // const products = await Product.find({ merchant: req.merchant });
//     const stock = existingProduct.quantity;
//     const price = existingProduct.totalamount;

//     // const merchant=existingProduct.req.merchant;
//     console.log("stock" + stock + "  price  " + price);

//     const existingUser = await User.findOne({ user });

//     console.log(productId);
//     console.log(user);
//     if (!existingUser)
//       return res.status(401).json({
//         errorMessage: "Wrong User,please check.",
//       });
//     if (!existingProduct)
//       return res.status(401).json({
//         errorMessage: "Wrong product,please check.",
//       });

//     const newCart = new Cart({
//       productId,
//       quantity,
//       user: existingUser,
//       price,
//       // merchant:merchant,
//     });

//     const savedCart = await newCart.save();
//     console.log(savedCart);
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
