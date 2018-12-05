const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoriesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: "f15b"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

mongoose.model("categories", CategoriesSchema);
