const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const passport = require("passport");

//require the models
require("./models/users");
require("./models/pages");
require("./models/categories");
require("./models/products");
require("./models/carts");
//require the passport
require("./services/passport");

//Connect to Mongo DB
mongoose.connect(keys.mongoURI, () => {
  console.log("Connected to mongo server");
});

//Initialize passport
app.use(passport.initialize());

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//require the routes
require("./routes/authRoutes")(app);
require("./routes/admin/admin_pages")(app);
require("./routes/admin/admin_categories")(app);
require("./routes/admin/admin_products")(app);

require("./routes/products")(app);
require("./routes/pages")(app);
require("./routes/categories")(app);
require("./routes/carts")(app);
require("./routes/profileInfo")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // if not https redirect to https unless logging in using OAuth
  app.use(express.static("client/build"));

  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("The server is listening to the port", port);
});
