const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: keys.facebook.clientID,
//       clientSecret: keys.facebook.clientSecret,
//       profileFields: ["email", "displayName", "photos"],
//       callbackURL: "/api/auth/facebook/callback",
//       passReqToCallback: true,
//       proxy: true
//     },
//     async (req, token, refreshToken, profile, done) => {
//       try {
//         const user = await User.findOne({ facebook: profile.id });
//         if (user) {
//           return done(null, user);
//         }
//         const newUser = new User();
//         newUser.facebook = profile.id;
//         newUser.fullname = profile.displayName;
//         newUser.username = profile.displayName;
//         newUser.email = profile._json.email;
//         newUser.userImage = `https://graph.facebook.com/${
//           profile.id
//         }/picture?type=large`;
//         newUser.fbTokens.push({ token });
//         const savedUser = await newUser.save();
//         done(null, savedUser);
//       } catch (err) {
//         return done(err, false);
//       }
//     }
//   )
// );

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      profileFields: ["email", "displayName", "photos"],
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
      proxy: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ google: profile.id });
        if (user) {
          return done(null, user);
        }
        const newUser = new User();
        newUser.google = profile.id;
        newUser.fullname = profile.displayName;
        newUser.username = profile.displayName;
        newUser.email = profile.emails[0].value;
        newUser.google = profile.id;
        newUser.userImage = profile._json.image.url;
        const savedUser = await newUser.save();
        done(null, savedUser);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

//JSON Strategy
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromHeader("authorization");
opts.secretOrKey = keys.secretOrKey;

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      console.log(error);
    }
  })
);
module.exports = passport;
