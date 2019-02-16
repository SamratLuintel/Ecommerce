const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../utils/validation/register-validation");
const validateLoginInput = require("../utils/validation/login-validation");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const tokenForUser = async user => {
  console.log("From token", user);
  const token = await jwt.sign({ id: user.id }, keys.secretOrKey, {
    expiresIn: 86400
  });
  return token;
};

module.exports = app => {
  app.post("/api/register", async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json(errors);
    }

    const newUser = new User({
      username: name,
      fullname: name,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(async user => {
            const token = await tokenForUser(user);
            res.status(200).send({ token });
          })
          .catch(err => console.log(err));
      });
    });
  });

  app.post("/api/login", async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    //Find the user by email
    try {
      const user = await User.findOne({ email });
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      //Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await tokenForUser(user);
        res.status(200).send({ token });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    } catch (error) {
      console.log("Oops some error have occured", error);
    }
  });
  app.get(
    "/api/auth/google",
    passport.authenticate("google", {
      scope: "profile",
      prompt: "select_account",
      session: false,
      scope: ["openid", "profile", "email"]
    })
  );

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { session: false }),
    async (req, res) => {
      console.log("callback is passed", req.user);
      const token = await tokenForUser(req.user);
      const queryToken = encodeURIComponent(token);
      res.redirect(`/${token}`);
    }
  );

  //FACEBOOK O AUTH
  app.get(
    "/api/auth/facebook",
    passport.authenticate("facebook", {
      prompt: "select_account",
      scope: "email"
    })
  );
  //@route GET api/auth/facebook/callback
  //@desc Facebook O Auth
  //@access Public
  app.get(
    "/api/auth/facebook/callback",
    passport.authenticate("facebook", { session: false }),
    async (req, res) => {
      console.log("Facebook callback route is called");
      const token = await tokenForUser(req.user);
      const queryToken = encodeURIComponent(token);
      //Facebook adds *_* at the end which will create problem with our token verification
      //so we are adding rr so that the token will be unchanged and *_* will be added to rr
      res.redirect(`/${token}/rr`);
    }
  );
  //We will make sure the token stored in the local storage is valid
  app.get(
    "/api/auth/get-user",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.status(200).send(req.user);
    }
  );
};
