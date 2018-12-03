var express = require("express");
var router = express.Router();
var User = require("../users/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config");
var VerifyToken = require("./VerifyToken");

router.post("/register", function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    },
    function(err, user) {
      if (err) {
        return res
          .status(500)
          .send("There was a problem registering the user.");
      }

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 3600 // 1 hour
      });

      res.status(200).send({ auth: true, token: token });
    }
  );
});

router.get("/me", VerifyToken, function(req, res) {
  // After middleware added (VerifyToken)
  User.findById(
    req.userId,
    { password: 0 }, // Projection | Avoid return password
    function(err, user) {
      if (err)
        return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send(user);
    }
  );
});

router.post("/login", function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    var validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword)
      return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 3600 });

    res.status(200).send({ auth: true, token: token });
  });
});

router.get("/logout", function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
