const router = require("express").Router();
const Admin = require("../models/adminModel");
const Merchant = require("../models/merchantModel");
const User = require("../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const auth = require("../middleware/authAdmin.js");

const express = require("express");
const path = require("path");
const app = express();

const { Console } = require("console");

// const AdminBro = require(`admin-bro`)
// const AdminBroExpress = require(`@admin-bro/express`)
// const adminBro = new AdminBro ({
//     Databases: [],
//     rootPath: `/admin`,
// })

// const router = AdminBroExpress.buildRouter(adminBro)

// app.use(adminBro.options.rootPath, router)
// app.listen(8080, () => console.log(‘AdminBro is under localhost:8080/admin’))
//login
router.get("/allmerchants", async (req, res) => {
  try {
    const PAGE_SIZE = 5;
    const page = parseInt(req.query.page || "0");
    const total = await Merchant.countDocuments({});

    const token = req.cookies;

    // console.log("TOKEN................." + token);

    const merchant = await Merchant.find({ id: req.merchant })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    console.log("all merchants....." + merchant); //here all users...

    res.json({ totalPages: Math.ceil(total / PAGE_SIZE), merchant });
    // console.log(users);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }

});




router.get("/allusers", async (req, res) => {
  try {
    const token = req.cookies;
    // console.log("TOKEN................." + token);

    console.log("USERID................" + req.user); //here particular user id is retrieved
    const PAGE_SIZE = 5;
    const page = parseInt(req.query.page || "0");
    const total = await User.countDocuments({});
    // const adminuser = await Admin.findByUserName({ username: req.user });
    const user = await User.find({ id: req.user })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    // console.log("username" + req.user);

    console.log(user); //here all users...
    // console.log("newwwwwwwwwwwwwwww");
    res.json({ totalPages: Math.ceil(total / PAGE_SIZE), user });
    // console.log(users);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    // const token = req.cookies;

    console.log("admin router");

    console.log("admin_login" + username, password);

    if (!username || !password)
      return res.status(400).json({
        errorMessage: "Please enter all required fields.",
      });

    const existingUser = await Admin.findOne({ username });

    if (!existingUser)
      return res.status(401).json({
        errorMessage: "Wrong email or password,please register.",
      });
    const correctPassword = await Admin.findOne({ password });

    if (!correctPassword)
      return res.status(401).json({
        errorMessage: "Invalid Username/Password",
      });

    // create a JWT token

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true }).send();
  } catch (err) {
    res.status(500).send();
    console.error(err);
  }
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("token..................." + token);

    if (!token) return res.json(null);

    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = validatedUser.id;

    res.json(validatedUser.id);
    console.log(validatedUser);
  } catch (err) {
    return res.json(null);
  }
});

router.get("/logout", (req, res) => {
  try {
    res.clearCookie("token").send();
  } catch (err) {
    return res.json(null);
  }
  ``;
});

module.exports = router;
