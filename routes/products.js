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
};
