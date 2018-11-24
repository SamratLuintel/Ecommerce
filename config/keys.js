if (process.env === "production") {
  module.exports = require("./prod.js");
} else {
  module.exports = require("./dev.js");
}
