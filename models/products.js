const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories"
  },
  price: {
    type: Number,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

mongoose.model("products", ProductSchema);
