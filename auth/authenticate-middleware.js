const jwt = require("jsonwebtoken");

const secret = require("./secret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({ message: "Invalid token. Better luck next time." });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Nah B." });
  }
};
