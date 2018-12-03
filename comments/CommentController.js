var express = require("express");
var router = express.Router();
var VerifyToken = require("../users/VerifyToken");

var Comment = require("./Comment");

router.get("/:news_id", function(req, res) {
  Comment.find({ news_id: req.params.news_id }, function(err, comment) {
    if (err) {
      return res.status(500).send("There was a problem finding the comment.");
    }
    if (!comment) {
      return res.status(404).send("comment not found");
    }
    return res.status(200).send(comment);
  });
});

router.post("/", VerifyToken, function(req, res) {
  Comment.create(
    {
      user_id: req.userId,
      news_id: req.body.news_id,
      content: req.body.content
    },
    function(err, comment) {
      if (err) {
        return res
          .status(500)
          .send("There was a problem adding the comment." + err);
      }
      res.status(200).send(comment);
    }
  );
});

router.delete("/:id/", VerifyToken, function(req, res) {
  Comment.findOneAndRemove(req.params.id, function(err, comment) {
    if (err) {
      return res.status(500).send("There was a problem getting the comment.");
    }
    if (comment.user_id != req.userId) {
      return res
        .status(403)
        .send("You are not allowed to delete this comment.");
    }
    return res.status(200).send("This comment was deleted");
  });
});

module.exports = router;
