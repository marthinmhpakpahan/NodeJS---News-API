/**
 * For spinning up the node server on a specific port of your choice
 */

var app = require("./app");
var port = process.env.PORT || 4001;

var server = app.listen(port, function() {
  console.log("Express server listening on port " + port);
});
