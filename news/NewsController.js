var express = require("express");
var router = express.Router();
var VerifyToken = require("../users/VerifyToken");

var News = require("./News");

router.get("/", function(req, res) {
  News.find({}, function(err, news) {
    if (err) {
      return res.status(500).send("There was a problem finding the news.");
    }
    if (!news) {
      return res.status(404).send("news not found");
    }
    return res.status(200).send(news);
  });
});

router.post("/", VerifyToken, function(req, res) {
  News.create(
    {
      user_id: req.userId,
      title: req.body.title,
      content: req.body.content,
      thumbnail: req.body.thumbnail
    },
    function(err, news) {
      if (err) {
        return res
          .status(500)
          .send("There was a problem adding the news." + err);
      }
      res.status(200).send(news);
    }
  );
});

router.delete("/:id/", VerifyToken, function(req, res) {
  News.findOneAndRemove(req.params.id, function(err, news) {
    if (err) {
      return res.status(500).send("There was a problem getting the news.");
    }
    if (news.user_id != req.userId) {
      return res.status(403).send("You are not allowed to delete this news.");
    }
    return res.status(200).send("This news was deleted");
  });
});

module.exports = router;
