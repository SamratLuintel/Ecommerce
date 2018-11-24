const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const tokenForUser = async user => {
  const token = await jwt.sign({ id: user.id }, keys.secretOrKey, {
    expiresIn: 86400
  });
  return token;
};
module.exports = app => {
  app.get(
    "/api/auth/google",
    passport.authenticate("google", {
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
      res.redirect(`/home/${token}`);
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
