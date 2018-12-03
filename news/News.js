var mongoose = require("mongoose");
var NewsSchema = new mongoose.Schema({
  user_id: String,
  title: String,
  content: String,
  thumbnail: String
});

mongoose.model("News", NewsSchema);

module.exports = mongoose.model("News");
