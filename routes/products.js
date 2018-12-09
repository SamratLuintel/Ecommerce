const mongoose = require("mongoose");
const Product = mongoose.model("products");

module.exports = app => {
  //Fetches all the products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({ message: "Oops some error occured" });
      console.log(error);
    }
  });
  //Fetch featured products
  //product with featured value set to true
  //For now we have to set it manually in mongo server
  //later we can implement some algorithm to do this automatically
  app.get("/api/product/featured", async (req, res) => {
    console.log("Find featured product have been called");
    try {
      const product = await Product.find({ featured: true });
      res.status(200).send(product);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Some internal server has occured. Please try again later"
      });
    }
  });

  //Fetch a particular product
  app.get("/api/product/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.status(200).send(product);
      } else {
        res
          .status(400)
          .send({ message: "The product with provided id does not exist" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Some internal server error has occured.Please try again later"
      });
    }
  });

  //Fetch product per particular category
  app.get("/api/product/per-category/:category", async (req, res) => {
    try {
      const products = await Product.find({ category: req.params.category });
      res.status(200).send({ category: req.params.category, products });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Some internal server error has occured.Please try again later"
      });
    }
  });
};
