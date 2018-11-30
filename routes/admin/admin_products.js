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

  //Creates a product
  app.post("/api/add-product", requireToken, async (req, res) => {
    const { errors, isValid } = ValidateProduct(req.body);
    if (!isValid) return res.status(400).send(errors);

    const product = await new Product({
      title: req.body.title,
      desc: req.body.desc,
      category: req.body.category,
      price: req.body.price,
      images: req.body.images,
      createdBy: req.user
    }).save();

    res.status(200).send(product);
  });
};
