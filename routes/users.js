var express = require("express");
var router = express.Router();
require("../models/connection");
const { checkBody } = require("../modules/checkBody");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

/* GET users listing. */
router.post("/signup", async (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: uid2(32),
      });
      newUser.save().then((data) => {
        res.json({ result: true, user: data.user });
      });
    } else {
      res.json({ result: false, error: "User already exist" });
    }
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ email: req.body.email }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, user: "utilisateur connecté" });
    } else {
      res.json({
        result: false,
        error: "User not found or incorrect password",
      });
    }
  });
});


module.exports = router;
