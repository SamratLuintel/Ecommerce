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
  app.get("/api/products/featured", async (req, res) => {
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
      const product = await Product.findById(req.params.id).populate(
        "reviews.createdBy"
      );
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

  //Fetch popular product
  app.get("/api/products/popular", async (req, res) => {
    try {
      const products = await Product.find({ popular: true })
        .sort({ createdOn: -1 })
        .limit(5);
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Some internal server error has occured.Please try again later"
      });
    }
  });

  //Fetch recent products
  app.get("/api/products/recent", async (req, res) => {
    try {
      const products = await Product.find({})
        .sort({ createdOn: -1 })
        .limit(4);
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Some internal server error has occured.Please try again later"
      });
    }
  });

  //Fetch products of particular category
  app.get(`/api/products/:id/:skip/:limit`, async (req, res) => {
    try {
      const skipNumber = parseInt(req.params.skip);
      const limitNumber = parseInt(req.params.limit);

      console.log("Product of partcular category", req.params.id);
      const products = await Product.find({ category: req.params.id })
        .sort({ createdOn: -1 })
        .skip(skipNumber)
        .limit(limitNumber);

      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(422).send(error);
    }
  });

  //Find products
  app.get("/api/products/find/:searchText", async (req, res) => {
    console.log("Search product have been called", req.params.searchText);
    const regex = `^${req.params.searchText}`;
    try {
      const products = await Product.find({
        title: { $regex: regex, $options: "i" }
      });
      console.log(products);
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
    }
  });
};
