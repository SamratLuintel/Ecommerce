const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  facebook: {
    type: String,
    sparse: true
  },
  email: {
    type: String
  },
  userImage: { type: String }
});

mongoose.model("users", UserSchema);
