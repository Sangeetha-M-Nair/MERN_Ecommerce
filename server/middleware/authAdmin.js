const jwt = require("jsonwebtoken");

function authAdmin(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized!" });
    const validatedAdmin = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = validatedAdmin._id;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ errorMessage: "Unauthorized....." });
  }
}

module.exports = authAdmin;
