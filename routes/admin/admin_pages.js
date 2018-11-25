const ValidateAddPage = require("../../utils/validation/add-page-validation");
const passport = require("passport");
const mongoose = require("mongoose");
const Page = mongoose.model("pages");

const requireToken = passport.authenticate("jwt", { session: false });

module.exports = app => {
  app.post("/api/add-page", requireToken, async (req, res) => {
    const { errors, isValid } = ValidateAddPage(req.body);
    console.log(errors);
    if (!isValid) return res.status(400).send(errors);
    if (isValid) {
      const title = req.body.title;
      const slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
      if (slug === "") slug = title.replace(/\s+/g, "-").toLowerCase();
      const content = req.body.content;

      //Check to see if the slug is unique
      try {
        const page = await Page.findOne({ slug });
        if (page) {
          res.status(400).send({
            slug: "Page with provided slug already exist, choose another slug"
          });
        }
      } catch (error) {
        console.log("From add page route", error);
      }

      //Create a new page
      await new Page({
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        sorting: 0
      }).save();

      res.status(200).send();
    }
  });

  app.get("/api/pages", requireToken, async (req, res) => {
    const pages = await Page.find({})
      .sort({ sorting: 1 })
      .exec();
    res.status(200).send(pages);
  });
};
