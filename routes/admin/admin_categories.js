const mongoose = require("mongoose");
const passport = require("passport");
const Category = mongoose.model("categories");
const ValidateCategory = require("../../utils/validation/category-validation");

const requireToken = passport.authenticate("jwt", { session: false });
module.exports = app => {
  app.post("/api/add-category", requireToken, async (req, res) => {
    const { errors, isValid } = ValidateCategory(req.body);
    console.log(errors);
    if (!isValid) return res.status(400).send(errors);

    const title = req.body.title;
    let slug = req.body.title.replace(/\s+/g, "-").toLowerCase();

    //Check to see if the slug is unique
    try {
      const category = await Category.findOne({ slug });
      if (category) {
        res.status(400).send({
          title:
            "Category with provided title already exist, choose another title"
        });
      }
    } catch (error) {
      console.log("From add category route", error);
    }

    //Create a new category
    await new Category({
      title,
      slug,
      createdBy: req.user
    }).save();

    res.status(200).send();
  });

  app.get("/api/categories", requireToken, async (req, res) => {
    const categories = await Category.find({ createdBy: req.user.id });
    res.status(200).send(categories);
  });
};
