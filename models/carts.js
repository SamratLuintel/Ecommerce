const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartsSchema = new Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
      },
      amount: 0
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

mongoose.model("carts", CartsSchema);
