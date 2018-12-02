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
      res
        .status(400)
        .send({
          message:
            "Some internal server error has occured.Please try again later"
        });
    }
  });
};
