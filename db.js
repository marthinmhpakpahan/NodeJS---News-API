/**
 * For specifying the connection to the database
 */

var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://admin:admin123@ds249605.mlab.com:49605/news",
  { useNewUrlParser: true }
);
