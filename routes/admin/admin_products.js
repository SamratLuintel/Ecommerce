const mongoose = require("mongoose");
const passport = require("passport");
const Product = mongoose.model("products");
const ValidateProduct = require("../../utils/validation/product-validation");

const requireToken = passport.authenticate("jwt", { session: false });

module.exports = app => {
  //Lists all the products
  app.get("/api/products", requireToken, async (req, res) => {
    console.log("Fetch products is called");
    const products = await Product.find({ createdBy: req.user.id });
    res.status(200).send(products);
  });
};
