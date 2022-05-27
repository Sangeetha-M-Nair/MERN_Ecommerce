const router = require("express").Router();
const Merchant = require("../models/merchantModel");
var nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authMerchant = require("../middleware/authMerchant.js");

const express = require("express");
const path = require("path");
const app = express();

const { Console } = require("console");
//sendTextMessage
const client = require("twilio")(
  "AC41ba7604c276a33050ccb6310f583a43",
  "0dfa35ffacd6334fa7bc669c193dae7c"
);

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
`-`;

router.post("/", async (req, res) => {
  console.log("merchant router");
});

router.get("/merchantProfile", authMerchant, async (req, res) => {
  try {
    const token = req.cookies.token;

    // const token = req.cookies;

    console.log(req.token);

    console.log("TOKEN................." + token);

    console.log("merchanttttID................" + req.merchant); //here particular merchant id is retrieved

    const merchants = await Merchant.findById({ _id: req.merchant });
    console.log("id.............." + req.merchant);

    console.log(merchants); //here all merchants...
    // console.log("newwwwwwwwwwwwwwww");
    res.json(merchants);
    // console.log(merchants);
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

router.post("/change-password/:id", authMerchant, async (req, res) => {
  const oldPassword = req.body.oldpassword;
  // Merchant.findOne({password:req.merchant.oldpassword})
  const newPassword = req.body.newpassword;
  const passwordVerify = req.body.passwordVerify;
  const merchantId = req.merchant;
  //  const sentToken = req.merchant.id;
  //  const sentToken = req.cookies.token;

  const existingMerchant = await Merchant.findById({ _id: req.merchant });

  const correctPassword = await bcrypt.compare(
    oldPassword,
    existingMerchant.passwordHash
  );

  if (!correctPassword)
    return res.status(401).json({
      errorMessage: "Old Password is incorrect.",
    });

  console.log("--------------new password" + newPassword);
  // console.log("token"+sentToken);
  //const sentToken = req.cookies.token;
  if (newPassword !== passwordVerify)
    return res.status(400).json({ errorMessage: "password do not match" });

  Merchant.findOne({ _id: req.merchant })
    .then((merchant) => {
      console.log("Merchant>----------------" + merchant);
      if (!merchant) {
        return res.status(422).json({ errorMessage: "no merchant detected" });
      }

      var pwdExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!pwdExp.test(newPassword))
        return res.status(400).json({
          errorMessage:
            "enter a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        });

      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        merchant.passwordHash = hashedpassword;
        console.log("hashedpassword  " + hashedpassword);
        merchant.resetToken = undefined;
        merchant.expireToken = undefined;
        merchant.save().then((savedMerchant) => {
          return res.json({ message: "password updated successfully" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/merchantRegister", async (req, res) => {
  console.log(req.body);

  try {
    const {
      shopid,
      shopname,
      firstname,
      lastname,
      password,
      email,
      mobno,

      address,
      street,
      city,
      state,
      zipcode,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !address ||
      !email ||
      !mobno ||
      !password ||
      !shopid ||
      !shopname ||
      !street ||
      !state ||
      !city ||
      !zipcode
    ) {
      return res.status(400).json({
        errorMessage: "please enter all required field",
      });
    }

    //regex

    // var emailRegex =/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    var emailRegex =
      /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/i;
    var valid = emailRegex.test(email);
    if (!valid)
      return res.status(400).json({
        errorMessage: "please enter valid email",
      });

    var nameExp = /^[A-Za-z]*$/;
    if (!nameExp.test(firstname))
      return res.status(400).json({
        errorMessage: "please enter text only",
      });

    var lnameExp = /^[A-Za-z]*$/;
    if (!lnameExp.test(lastname))
      return res.status(400).json({
        errorMessage: "please enter correct last name",
      });

    var phoneExp = /^[0-9]*$/;
    if (!phoneExp.test(mobno))
      return res.status(400).json({
        errorMessage: "please enter 10 digit number",
      });

    //var pwdExp = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var pwdExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!pwdExp.test(password))
      return res.status(400).json({
        errorMessage:
          "enter a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
      });

    if (firstname.length < 3)
      return res.status(400).json({
        errorMessage: "please enter min 3 characters long name",
      });

    if (mobno.length < 10 || mobno.length > 10)
      return res.status(400).json({
        errorMessage: "please enter correct Phone number",
      });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "please enter password atleast 6 characters",
      });

    // if (email.match([a-z0-9]+@[a-z]+\.[a-z]{2,3})
    //    return res.status(400).json({
    //      errorMessage: "please enter correct email id",
    //  });

    // if (password !== passwordVerify)
    //   return res.status(400).json({
    //     errorMessage:
    //       "please enter the correct password twice for verification",
    //   });

    const existingMerchant = await Merchant.findOne({ email });
    console.log(existingMerchant);
    if (existingMerchant)
      return res.status(400).json({
        errorMessage: "An account with this email already exists",
      });
    const existingMerchantt = await Merchant.findOne({ mobno });
    console.log(existingMerchantt);

    if (existingMerchantt)
      return res.status(400).json({
        errorMessage: "An account with this Phone number already exists",
      });
    //hash the password

    // if (!profileImg)
    //   return res.status(400).json({
    //     errorMessage: "upload an Image",
    //   });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //console.log(passwordHash);

    //save the - in the mongoDb

    //ma'am fakepath removed

    // var imagePath = "";
    // console.log(profileImg);
    // console.log(firstname);
    // const image = profileImg.split("fakepath\\");
    // console.log(image[1]);
    // imagePath = image[1];
    // console.log(imagePath);

    //image(request.body.image);

    const newMerchant = new Merchant({
      shopid,
      shopname,
      firstname,
      lastname,
      mobno,
      email,
      passwordHash,
      address,
      street,
      city,
      state,
      zipcode,
      merchant: req.token,
    });

    //document.body.appendChild(image[1]);

    const savedMerchant = await newMerchant.save();

    //create a JWT token

    const token = jwt.sign(
      {
        id: savedMerchant._id,
      },
      process.env.JWT_SECRET
    );
    console.log("merchant" + token);

    res.cookie("token", token, { httpOnly: true }).send();
  } catch (err) {
    console.log(err);

    res.status(500).send();
  }
});

router.post("/merchantLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    //display image
    // const PImage = await merchant.findById(email);
    //  PImage.profileImg = profileImg;

    // validation

    if (!email || !password)
      return res.status(400).json({
        errorMessage: "Please enter all required fields.",
      });

    // get merchant account

    const existingMerchant = await Merchant.findOne({ email });

    if (!existingMerchant)
      return res.status(401).json({
        errorMessage: "Wrong email or password,please register.",
      });

    const correctPassword = await bcrypt.compare(
      password,
      existingMerchant.passwordHash
    );

    if (!correctPassword)
      return res.status(401).json({
        errorMessage: "Invalid merchantname/Password",
      });

    // create a JWT token

    const token = jwt.sign(
      {
        id: existingMerchant._id,
      },
      process.env.JWT_SECRET
    );
    console.log(token);
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (err) {
    res.status(500).send();
  }
});

router.put("/merchantUpdate", authMerchant, async (req, res) => {
  try {
    console.log(
      "inside /id..................................................."
    );
    const {
      shopid,
      shopname,
      firstname,
      lastname,
      mobno,
      email,
      address,
      street,
      city,
      state,
      zipcode,
    } = req.body;
    //nullvalidation
    // validfirstName = req.body.firstName||firstName;
    // validlastName = req.body.lastName||lastName;
    // validphone =req.body.phone||phone;
    // validemail =req.body.email||email;

    console.log("firstname--------" + firstname);

    const merchantId = req.merchant;

    const originalMerchant = await Merchant.findById({ _id: req.merchant });

    console.log("------------merchantid is -----------" + merchantId);
    // const originalMerchant = await Merchant.findById(merchantId);

    console.log("original merchant........." + originalMerchant);
    // var imagePath = "";

    // const image = profileImg.split("fakepath\\");
    // console.log("imagepathhhhhhhhhh");

    //originalMerchant.firstName = originalMerchant.firstName || req.body.firstName;
    // console.log("ist name------------------------" + firstName);

    // originalMerchant.lastName =  req.body.lastName;
    // originalMerchant.email =  req.body.email;
    // originalMerchant.phone =  req.body.phone;
    originalMerchant.shopid = shopid || originalMerchant.shopid;
    originalMerchant.shopname = shopname || originalMerchant.shopname;

    originalMerchant.firstname = firstname || originalMerchant.firstname;
    originalMerchant.lastname = lastname || originalMerchant.lastname;
    originalMerchant.mobno = mobno || originalMerchant.mobno;
    originalMerchant.address = address || originalMerchant.address;
    originalMerchant.street = street || originalMerchant.street;
    originalMerchant.city = city || originalMerchant.city;
    originalMerchant.email = email || originalMerchant.email;
    originalMerchant.mobno = mobno || originalMerchant.mobno;
    originalMerchant.state = state || originalMerchant.state;
    originalMerchant.zipcode = zipcode || originalMerchant.zipcode;

    console.log(
      "originalMerchant--------------------------------" +
        originalMerchant.firstname
    );

    var emailRegex =
      /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/i;
    var valid = emailRegex.test(originalMerchant.email);
    if (!valid)
      return res.status(400).json({
        errorMessage: "please enter valid email",
      });

    var nameExp = /^[A-Za-z]*$/;
    if (!nameExp.test(originalMerchant.firstname))
      return res.status(400).json({
        errorMessage: "please enter text only",
      });

    var lnameExp = /^[A-Za-z]*$/;
    if (!lnameExp.test(originalMerchant.lastname))
      return res.status(400).json({
        errorMessage: "please enter correct last name",
      });

    var phoneExp = /^[0-9]*$/;
    if (!phoneExp.test(originalMerchant.mobno))
      return res.status(400).json({
        errorMessage: "please enter 10 digit number",
      });

    if (originalMerchant.firstname.length < 3)
      return res.status(400).json({
        errorMessage: "please enter min 3 characters long name",
      });

    if (
      originalMerchant.mobno.length < 10 ||
      originalMerchant.mobno.length > 10
    )
      return res.status(400).json({
        errorMessage: "please enter correct Phone number",
      });
    //profileImg = image;
    // if (!originalMerchant.firstName || !originalMerchant.lastName || !originalMerchant.phone || !originalMerchant.email) {
    //   return res.status(400).json({
    //     errorMessage: "please enter all required field",
    //   });
    // }
    const saveMerchant = await originalMerchant.save();
    // res.json(saveMerchant);
    console.log("saved Merchant  is " + saveMerchant);
    res.json({
      shopid: saveMerchant.shopid,
      shopname: saveMerchant.shopname,

      firstname: saveMerchant.firstname,
      lastname: saveMerchant.lastname,
      email: saveMerchant.email,
      mobno: saveMerchant.mobno,
      address: saveMerchant.address,
      street: saveMerchant.street,
      city: saveMerchant.city,
      state: saveMerchant.state,
      zipcode: saveMerchant.zipcode,
      // profileImg: saveMerchant.profileImg,
    });
    //validation
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

router.post("/send-email", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    // const existingUser = await User.findOne({ email });

    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const token = buffer.toString("hex");
      // console.log(token);

      Merchant.findOne({ email: req.body.email }).then((merchant) => {
        if (!merchant)
          return res.status(401).json({
            errorMessage: "this merchant does not exist..... .",
          });
        merchant.resetToken = token;
        console.log("reset token-----   " + token);
        console.log(`http://localhost:3000/reset/${token}`);

        // $_SERVER["HTTPS"] = false;
        //sms sending

        merchant.expireToken = Date.now() + 3600000; //valid for one hour
        //sms sending
        function sendTextMessage() {
          client.messages
            .create({
              body: `welcome to snippet manager your link for reset password is http://localhost:3000/reset/${token}`,
              to: "+971558051307", //trial purposes only to verified numbers
              from: "+19125138135", //my phone no
            })
            .then((message) =>
              console.log(
                `SMS sent successfully http://localhost:3000/reset/${token}`
              )
            )
            // here you can implement your fallback code
            .catch((error) => console.log(error));
        }
        sendTextMessage(token);
        //S@ngeethamnair245//https://console.twilio.com/?frameUrl=%2Fconsole%3Fx-target-region%3Dus1&newCustomer=true
        //sms sending end

        merchant.save().then((result) => {
          transporter.sendMail({
            //  let transporter = nodemailer.createTransport({
            to: merchant.email,
            from: "smn.maneeramkandath@gmail.com",
            subject: "password reset",
            html: `<h1>Welcome to snippet manager password</h1>
            <p>You requested for reset password </p>,
            <h5>click in this link <a href="http://localhost:3000/reset/${token}">Link</a>  to reset password</h5>`,
          });
          // alert("check your email");
          res.json({ message: "check yor email" });
          console.log("check your email");
          //    res.status(400).json({
          //    errorMessage: "check ur email.",
          //  });
        });

        //send sms

        // messagebird.messages.create(
        //    {
        //      originator: "+97155801307",
        //      recipients: [user.phone],
        //      body: `http://localhost:3000/reset/${token}`, //body
        //    },
        //    function (err, response) {
        //      if (err) {
        //        // Request has failed
        //        console.log(err);
        //        res.send("Error occured while sending message!");
        //      } else {
        //        // Request was successful
        //        console.log(response);
        //      }
        //    }
        //  );
      });
    });
  } catch (err) {
    console.log("errr...." + err.response.data);
    return res.json(null);
  }
});

//forgot password
router.post("/new-password/:id", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  //  const sentToken = req.cookies.token;
  console.log(newPassword);
  console.log(sentToken);

  Merchant.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((merchant) => {
      console.log(merchant);
      if (!merchant) {
        return res
          .status(422)
          .json({ errorMessage: "Try again session expired" });
      }

      var pwdExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!pwdExp.test(newPassword))
        return res.status(400).json({
          errorMessage:
            "enter a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        });

      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        merchant.passwordHash = hashedpassword;
        console.log("hashedpassword  " + hashedpassword);
        merchant.resetToken = undefined;
        merchant.expireToken = undefined;
        merchant.save().then((savedMerchant) => {
          return res.json({ message: "password updated successfully" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/merchantLoggedIn", authMerchant,(req, res) => {
  try {
    const token = req.cookies.token;
    console.log("token..............*****....." + token);

    if (!token) return res.json(null);

    const validatedMerchant = jwt.verify(token, process.env.JWT_SECRET);
    req.merchant = validatedMerchant.id;

    res.json(validatedMerchant.id);
    console.log("merchant ***" + validatedMerchant.id);
  } catch (err) {
    console.log(err);
    return res.json(null);
  }
});

module.exports = router;
