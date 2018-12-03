/**
 * For configuring the application
 */

var express = require("express");
var app = express();
var db = require("./db");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  next();
});

var UserController = require("./users/UserController");
app.use("/users", UserController);

var NewsController = require("./news/NewsController");
app.use("/news", NewsController);

var CommentController = require("./comments/CommentController");
app.use("/comments", CommentController);

module.exports = app;
