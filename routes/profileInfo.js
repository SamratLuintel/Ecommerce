const keys = require("../config/keys");

module.exports = app => {
  app.get("/api/profileInfo/keys", (req, res) => {
    try {
      const responseKeys = {
        cloudinary: keys.cloudinary
      };
      res.status(200).send(responseKeys);
    } catch (error) {
      console.log(error);
    }
  });
};
