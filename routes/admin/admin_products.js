const mongoose = require("mongoose");
const passport = require("passport");
const Product = mongoose.model("products");
const ValidateProduct = require("../../utils/validation/product-validation");
const ValidateProductReview = require("../../utils/validation/product-review-validation");
const requireToken = passport.authenticate("jwt", { session: false });

module.exports = app => {
  //Lists all the products
  app.get("/api/admin-products", requireToken, async (req, res) => {
    console.log("Fetch products is called");
    const products = await Product.find({
      createdBy: req.user.id
    }).sort({ createdOn: -1 });
    res.status(200).send(products);
  });

  //Creates a product
  app.post("/api/add-product", requireToken, async (req, res) => {
    const { errors, isValid } = ValidateProduct(req.body);
    if (!isValid) return res.status(400).send(errors);

    const product = await new Product({
      title: req.body.title,
      desc: req.body.desc,
      category: req.body.category.value,
      price: req.body.price,
      details: req.body.details,
      images: req.body.images,
      createdBy: req.user
    }).save();

    res.status(200).send(product);
  });

  //Fetches a product
  app.get("/api/admin-product/:id", requireToken, async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        res
          .status(400)
          .send({ message: "The product with provided id does not exist" });

      if (!product.createdBy.equals(req.user.id))
        return res
          .status(401)
          .send({ message: "That is the the product created by you" });
      res.status(200).send(product);
    } catch (err) {
      console.log(err);
    }
  });

  //Edits a Product
  app.post("/api/admin-product/:id", requireToken, async (req, res) => {
    const { errors, isValid } = ValidateProduct(req.body);
    if (!isValid) return res.status(400).send(errors);
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        res
          .status(400)
          .send({ message: "The product with provided id does not exist" });

      if (!product.createdBy.equals(req.user.id))
        return res
          .status(401)
          .send({ message: "That is the the product created by you" });

      const newProduct = await Product.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          title: req.body.title,
          desc: req.body.desc,
          category: req.body.category.value,
          price: req.body.price,
          images: req.body.images
        },
        { new: true }
      );

      res.status(200).send(newProduct);
    } catch (err) {
      console.log(err);
    }
  });

  //Deletes a product
  app.delete("/api/admin-product/:id", requireToken, async (req, res) => {
    console.log("Delete product page is called");
    try {
      const product = await Product.findById(req.params.id).populate(
        "reviews.createdBy"
      );
      if (!product)
        res
          .status(400)
          .send({ message: "The product with provided id does not exist" });

      if (!product.createdBy.equals(req.user.id))
        res
          .status(401)
          .send({ message: "That is not the product created by you" });

      await Product.findByIdAndRemove(req.params.id);
      res.status(200).send();
    } catch (error) {
      console.log(error);
    }
  });

  //Add a particular review for a product
  app.post("/api/products/add-review", requireToken, async (req, res) => {
    try {
      console.log("Add review is called", req.body.productId);
      const { errors, isValid } = ValidateProductReview(req.body);
      if (!isValid) return res.status(400).send(errors);
      //Checking if the user has already rated the product
      const product = await Product.findOne({
        _id: req.body.productId,
        reviews: { $elemMatch: { createdBy: req.user._id } }
      });

      console.log("Product is matched", product);
      //If product does not
      if (product)
        return res.status(400).send({
          message: "The user has already rated the product"
        });

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.body.productId },
        {
          $push: {
            reviews: {
              rating: req.body.rating,
              comment: req.body.comment,
              createdBy: req.user
            }
          }
        },
        { new: true }
      );
      res.status(200).send({ message: "Comment have been successfully added" });
      // console.log("Reviews have been successfully added", updatedProduct);
    } catch (error) {
      console.log(error);
    }
  });
};
