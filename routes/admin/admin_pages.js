const ValidatePage = require("../../utils/validation/page-validation");
const passport = require("passport");
const mongoose = require("mongoose");
const Page = mongoose.model("pages");

const requireToken = passport.authenticate("jwt", { session: false });

module.exports = app => {
  app.post("/api/add-page", requireToken, async (req, res) => {
    const { errors, isValid } = ValidatePage(req.body);
    console.log(errors);
    if (!isValid) return res.status(400).send(errors);

    const title = req.body.title;
    let slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
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
      title,
      slug,
      content,
      sorting: 0,
      createdBy: req.user
    }).save();

    res.status(200).send();
  });

  //Shows all the pages
  app.get("/api/pages", requireToken, async (req, res) => {
    const pages = await Page.find({ createdBy: req.user.id })
      .sort({ sorting: 1 })
      .exec();
    res.status(200).send(pages);
  });

  //Gets the information of a specific page
  app.get("/api/page/:id", requireToken, async (req, res) => {
    try {
      const page = await Page.findById(req.params.id);
      if (page) {
        //If page exist and it is the one created by the user
        if (page.createdBy.equals(req.user.id)) {
          console.log("this line is called");
          res.status(200).send(page);
        } else {
          res
            .status(401)
            .send({ message: "That is not the post created by you" });
        }
      } else {
        res
          .status(400)
          .send({ message: "The page with provided id does not exist" });
      }
    } catch (err) {
      console.log("From /api/page/:id", err);
      res.status(400).send({ message: "Internal server error occured" });
    }
  });

  //Updates a page
  app.post("/api/page/:id", requireToken, async (req, res) => {
    try {
      const { errors, isValid } = ValidatePage(req.body);
      console.log(errors);
      if (!isValid) return res.status(400).send(errors);

      const page = await Page.findById(req.params.id);
      if (page) {
        //If page exist and it is the one created by the user
        if (page.createdBy.equals(req.user.id)) {
          const newPage = await Page.findOneAndUpdate(
            { _id: req.params.id },
            {
              title: req.body.title,
              content: req.body.content
            },
            { new: true }
          );

          console.log(newPage);
          res.status(200).send(newPage);
        } else {
          //The above page is not the one created by User
          res
            .status(401)
            .send({ message: "That is not the post created by you" });
        }
      } else {
        res
          .status(400)
          .send({ message: "The page with provided id does not exist" });
      }
    } catch (err) {
      console.log("From /api/page/:id", err);
      res.status(400).send({ message: "Internal server error occured" });
    }
  });

  //Deletes a page
  app.delete("/api/page/:id", requireToken, async (req, res) => {
    console.log("Delete page is called");
    try {
      const page = await Page.findById(req.params.id);
      if (page) {
        //If page exist and it is the one created by the user
        if (page.createdBy.equals(req.user.id)) {
          await Page.findByIdAndRemove(req.params.id);
          res.status(200).send();
        } else {
          res
            .status(401)
            .send({ message: "That is not the post created by you" });
        }
      } else {
        res
          .status(400)
          .send({ message: "The page with provided id does not exist" });
      }
    } catch (err) {
      console.log("From delete /api/page/:id", err);
      res.status(400).send({ message: "Internal server error occured" });
    }
  });
};
