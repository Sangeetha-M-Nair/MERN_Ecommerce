const jwt = require("jsonwebtoken");

function authMerchant(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized!" });
    const validatedMerchant = jwt.verify(token, process.env.JWT_SECRET);

    req.merchant = validatedMerchant.id;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ errorMessage: "Unauthorized....." });
  }
}


module.exports = authMerchant;
