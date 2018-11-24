const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

//require the models
require("./models/users");

//require proxy file from the client

//require the passport
require("./services/passport");

//Connect to Mongo DB
mongoose.connect(
  keys.mongoURI,
  () => {
    console.log("Connected to mongo server");
  }
);

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//require the routes
require("./routes/admin/admin_pages")(app);
require("./routes/authRoutes")(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("The server is listening to the port", port);
});
