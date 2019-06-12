const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const Users = require("./usersModel.js");
const restricted = require("../middleware/restricted-middleware.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(data => res.status(201).json(data))
    .catch(err => {
      res.status(500).json({ message: "somebody goofed", error: err });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy("username", username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);

        res.status(200).json({
          message: "Come on in!",
          token
        });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "somebody goofed", error: err });
    });
});

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(data => res.status(200).json(data))
    .catch(err => {
      res.status(500).json({ message: "somebody goofed", error: err });
    });
});

function makeToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    roles: []
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
