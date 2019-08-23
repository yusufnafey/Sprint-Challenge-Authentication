const router = require("express").Router();

const Users = require("./auth-model");

router.post("/register", (req, res) => {
  const newUser = req.body;

  if (!newUser.username || !newUser.password) {
    res.status(400).json({ message: "Please provide username and password." });
  } else {
    Users.add(newUser)
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
      if (user) {
        res.status(200).json({ message: `Welcome, ${user.username}` });
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

module.exports = router;
