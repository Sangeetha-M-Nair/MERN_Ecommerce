const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const crypto = require("crypto");
const sendgridTransport = require("nodemailer-sendgrid-transport");
var nodemailer = require("nodemailer");
const authUser = require("../middleware/authUser.js");
const express = require("express");
const path = require("path");
const { Console } = require("console");
const { Client } = require("twilio/lib/twiml/VoiceResponse");
require("dotenv").config();
const app = express();

const client = require("twilio")(
  "AC41ba7604c276a33050ccb6310f583a43",
  "process.env.TWILIO_API_KEY"
);

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: "process.env.SENDGRID_API_KEY",
    },
  })
);
`-`;

router.get("/userProfile", authUser, async (req, res) => {
  try {
    const token = req.cookies.token;

    // const token = req.cookies;

    console.log(req.token);

    console.log("TOKEN................." + token);

    console.log("Userr................" + req.user); //here particular user id is retrieved

    const users = await User.findById({ _id: req.user });
    console.log("id.............." + req.user);

    console.log(users); //here all users...
    // console.log("newwwwwwwwwwwwwwww");
    res.json(users);
    // console.log(users);
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

router.post("/neww-password/:id", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  //  const sentToken = req.cookies.token;
  console.log(newPassword);
  console.log(sentToken);

  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      console.log(user);
      if (!user) {
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
        user.passwordHash = hashedpassword;
        console.log("hashedpassword  " + hashedpassword);
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((savedUser) => {
          return res.json({ message: "password updated successfully" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/sendd-email", async (req, res) => {
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

      User.findOne({ email: req.body.email }).then((user) => {
        if (!user)
          return res.status(401).json({
            errorMessage: "this user does not exist .",
          });
        user.resetToken = token;
        console.log("reset token-----   " + token);
        console.log(`http://localhost:3000/resetUser/${token}`);

        // $_SERVER["HTTPS"] = false;
        //sms sending

        user.expireToken = Date.now() + 3600000; //valid for one hour
        //sms sending
        function sendTextMessage() {
          client.messages
            .create({
              body: `Welcome to snippet manager your link for reset password is http://localhost:3000/resetUser/${token}`,
              to: "+971558051307", //trial purposes only to verified numbers
              from: "+19125138135", //my phone no
            })
            .then((message) =>
              console.log(
                `SMS sent successfully http://localhost:3000/resetUser/${token}`
              )
            )
            // here you can implement your fallback code
            .catch((error) => console.log(error));
        }
        sendTextMessage(token);
        //S@ngeethamnair245//https://console.twilio.com/?frameUrl=%2Fconsole%3Fx-target-region%3Dus1&newCustomer=true
        //sms sending end

        user.save().then((result) => {
          transporter.sendMail({
            //  let transporter = nodemailer.createTransport({
            to: user.email,
            from: "smn.maneeramkandath@gmail.com",
            subject: "password reset",
            html: `<h1>Welcome to snippet manager password</h1>
            <p>You requested for reset password </p>,
            <h5>click in this link <a href="http://localhost:3000/resetUser/${token}">Link</a>  to reset password</h5>`,
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

router.post("/change-password/:id", authUser, async (req, res) => {
  const oldPassword = req.body.oldpassword;

  // User.findOne({password:req.user.oldpassword})

  const newPassword = req.body.newpassword;
  const passwordVerify = req.body.passwordVerify;
  const userId = req.user;
  //  const sentToken = req.user.id;
  //  const sentToken = req.cookies.token;

  const existingUser = await User.findById({ _id: req.user });

  const correctPassword = await bcrypt.compare(
    oldPassword,
    existingUser.passwordHash
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

  User.findOne({ _id: req.user })
    .then((user) => {
      console.log("User>----------------" + user);
      if (!user) {
        return res.status(422).json({ errorMessage: "no user detected" });
      }

      var pwdExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!pwdExp.test(newPassword))
        return res.status(400).json({
          errorMessage:
            "enter a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        });

      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        user.passwordHash = hashedpassword;
        console.log("hashedpassword  " + hashedpassword);
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((savedUser) => {
          return res.json({ message: "password updated successfully" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/userUpdate", authUser, async (req, res) => {
  try {
    console.log(
      "inside uset update router..................................................."
    );
    const { firstname, lastname, phone, email } = req.body;
    //nullvalidation
    // validfirstName = req.body.firstName||firstName;
    // validlastName = req.body.lastName||lastName;
    // validphone =req.body.phone||phone;
    // validemail =req.body.email||email;

    console.log("firstname--------" + firstname);

    const userId = req.user;

    const originalUser = await User.findById({ _id: req.user });

    console.log("original user........." + originalUser);

    originalUser.firstname = firstname || originalUser.firstname;
    originalUser.lastname = lastname || originalUser.lastname;

    originalUser.firstname = firstname || originalUser.firstname;
    originalUser.lastname = lastname || originalUser.lastname;
    originalUser.phone = phone || originalUser.phone;
    originalUser.email = email || originalUser.email;

    console.log(
      "originalUser--------------------------------" + originalUser.firstname
    );

    var emailRegex =
      /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/i;
    var valid = emailRegex.test(originalUser.email);
    if (!valid)
      return res.status(400).json({
        errorMessage: "please enter valid email",
      });

    var nameExp = /^[A-Za-z]*$/;
    if (!nameExp.test(originalUser.firstname))
      return res.status(400).json({
        errorMessage: "please enter text only",
      });

    var lnameExp = /^[A-Za-z]*$/;
    if (!lnameExp.test(originalUser.lastname))
      return res.status(400).json({
        errorMessage: "please enter correct last name",
      });

    var phoneExp = /^[0-9]*$/;
    if (!phoneExp.test(originalUser.phone))
      return res.status(400).json({
        errorMessage: "please enter 10 digit number",
      });

    if (originalUser.firstname.length < 3)
      return res.status(400).json({
        errorMessage: "please enter min 3 characters long name",
      });

    if (originalUser.phone.length < 10 || originalUser.phone.length > 10)
      return res.status(400).json({
        errorMessage: "please enter correct Phone number",
      });
    //profileImg = image;
    // if (!originalUser.firstName || !originalUser.lastName || !originalUser.phone || !originalUser.email) {
    //   return res.status(400).json({
    //     errorMessage: "please enter all required field",
    //   });
    // }
    const saveUser = await originalUser.save();
    // res.json(saveUser);
    console.log("saved User  is " + saveUser);
    res.json({
      firstname: saveUser.firstname,
      lastname: saveUser.lastname,

      email: saveUser.email,
      phone: saveUser.phone,
    });
    //validation
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

router.get("/", authUser, async (req, res) => {
  try {
    const token = req.cookies;

    //console.log(req.token);

    console.log("TOKEN................." + token);

    console.log("USERID................" + req.user); //here particular user id is retrieved

    const users = await User.findById({ _id: req.user });
    console.log("id.............." + req.user);

    console.log(users); //here all users...
    // console.log("newwwwwwwwwwwwwwww");
    res.json(users);
    // console.log(users);
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

router.post("/userRegister", async (req, res, next) => {
  console.log(req.body);

  try {
    const { firstname, lastname, phone, email, password } = req.body;

    if (!firstname || !lastname || !phone || !email || !password) {
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
    if (!phoneExp.test(phone))
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

    if (phone.length < 10 || phone.length > 10)
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

    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists",
      });
    const existingUserr = await User.findOne({ phone });
    console.log(existingUserr);

    if (existingUserr)
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
    // console.log(firstName);
    // const image = profileImg.split("fakepath\\");
    // console.log(image[1]);
    // imagePath = image[1];
    // console.log(imagePath);

    //image(request.body.image);

    const newUser = new User({
      firstname,
      lastname,
      phone,
      email,
      passwordHash,
      //   profileImg: imagePath,
      user: req.token,
    });

    //document.body.appendChild(image[1]);

    const savedUser = await newUser.save();

    //create a JWT token

    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true }).send();
  } catch (err) {
    console.log(err);

    res.status(500).send();
  }
});

//login
router.post("/userLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    //display image
    // const PImage = await User.findById(email);
    //  PImage.profileImg = profileImg;

    // validation

    if (!email || !password)
      return res.status(400).json({
        errorMessage: "Please enter all required fields.",
      });

    // get user account

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(401).json({
        errorMessage: "Wrong email or password,please register.",
      });

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

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

module.exports = router;
