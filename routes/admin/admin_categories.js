const mongoose = require("mongoose");
const passport = require("passport");
const Category = mongoose.model("categories");
const ValidateCategory = require("../../utils/validation/category-validation");

const requireToken = passport.authenticate("jwt", { session: false });
module.exports = app => {
  //Create a new category
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

    await new Category({
      title,
      slug,
      createdBy: req.user
    }).save();

    res.status(200).send();
  });

  //Lists all the categories
  app.get("/api/categories", requireToken, async (req, res) => {
    const categories = await Category.find({ createdBy: req.user.id });
    res.status(200).send(categories);
  });

  //Gets a particular category
  app.get("/api/category/:id", requireToken, async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category) {
        //If page exist and it is the one created by the user
        if (category.createdBy.equals(req.user.id)) {
          res.status(200).send(category);
        } else {
          res
            .status(401)
            .send({ message: "That is not the post created by you" });
        }
      } else {
        res
          .status(400)
          .send({ message: "The category with provided id does not exist" });
      }
    } catch (err) {
      console.log("From /api/category/:id", err);
      res.status(400).send({ message: "Internal server error occured" });
    }
  });

  //Updates a category
  app.post(`/api/category/:id`, requireToken, async (req, res) => {
    try {
      const { errors, isValid } = ValidateCategory(req.body);
      console.log(errors);
      if (!isValid) return res.status(400).send(errors);

      const category = await Category.findById(req.params.id);
      if (category) {
        //If category exist and it is the one created by the user
        if (category.createdBy.equals(req.user.id)) {
          const newCategory = await Category.findOneAndUpdate(
            { _id: req.params.id },
            {
              title: req.body.title
            },
            { new: true }
          );

          console.log(newCategory);
          res.status(200).send(newCategory);
        } else {
          //The above page is not the one created by User
          res
            .status(401)
            .send({ message: "That is not the category created by you" });
        }
      } else {
        res
          .status(400)
          .send({ message: "The category with provided id does not exist" });
      }
    } catch (err) {
      console.log("From /api/page/:id", err);
      res.status(400).send({ message: "Internal server error occured" });
    }
  });

  //Deletes a category
  app.delete("/api/category/:id", requireToken, async (req, res) => {
    console.log("Delete category is called");
    try {
      const category = await Category.findById(req.params.id);
      if (category) {
        //If category exist and it is the one created by the user
        if (category.createdBy.equals(req.user.id)) {
          await Category.findByIdAndRemove(req.params.id);
          res.status(200).send();
        } else {
          res
            .status(401)
            .send({ message: "That is not the category created by you" });
        }
      } else {
        res
          .status(400)
          .send({ message: "The category with provided id does not exist" });
      }
    } catch (err) {
      console.log("From delete /api/page/:id", err);
      res.status(400).send({ message: "Internal server error occured" });
    }
  });
};
