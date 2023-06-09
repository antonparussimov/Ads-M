const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("advertiserToken");

  //Check is not token
  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization Denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.advertiser = decoded.advertiser;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
