const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = require("./secret");
const Users = require("./auth-model");

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  if (!user.username || !user.password) {
    res.status(400).json({ message: "Please provide username and password." });
  } else {
    Users.add(user)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "There was an error registering the new user." });
      });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwt(user);
        res.status(200).json({
          message: `Welcome, ${user.username}. Here is your token below.`,
          token
        });
      } else {
        res
          .status(401)
          .json({ message: `Nice try, ${user.username}. Maybe next time.` });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "There was an error logging in." });
    });
});

function getJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    jwtid: 1
  };

  const options = {
    expiresIn: "8h"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
