const mongoose = require("mongoose");
const Category = mongoose.model("categories");

module.exports = app => {
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await Category.find({});
      res.status(200).send(categories);
    } catch (error) {
      console.log(error);
    }
  });
};
