const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoriesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

mongoose.model("categories", CategoriesSchema);
