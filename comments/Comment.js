var mongoose = require("mongoose");
var CommentSchema = new mongoose.Schema({
  user_id: String,
  news_id: String,
  content: String
});

mongoose.model("Comment", CommentSchema);

module.exports = mongoose.model("Comment");
