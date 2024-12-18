const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    // extract jwt token
    const token = req.body.token || req.cookies.token;
    console.log("token print krte hue h ");
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing ",
      });
    }
    // verify the token with method in jwt
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      console.log("payload print krna h");
      console.log(payload);
    } catch (error) {
      // decode krte hue fatt gya
      return res.status(401).json({
        success: false,
        message: "token invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong while verifing",
    });
  }
};
