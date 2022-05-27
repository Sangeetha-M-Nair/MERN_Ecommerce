const router = require("express").Router();
const Category = require("../models/categoryModel");
const auth = require("../middleware/authAdmin.js");
const Admin = require("../models/adminModel");
const express = require("express");
const path = require("path");
const app = express();

router.post("/", auth, async (req, res) => {
  try {
    console.log("in category");

    const { catgname } = req.body;

    if (!catgname) {
      return res
        .status(400)
        .json({ errorMessage: "Please fill out all the fields" });
    }

    const newCategory = new Category({
      catgname,

      admin: req.admin,
    });
    const savedCategory = await newCategory.save();

    res.json(savedCategory);
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});





router.get("/categoryAll", async (req, res) => {
  try {
    // const token = req.cookies;
    // console.log(token);

    const category = await Category.find({});
    console.log("category" + category);
    res.json(category);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
