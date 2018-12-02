const passport = require("passport");
const mongoose = require("mongoose");
const requireToken = passport.authenticate("jwt", { session: false });
const Cart = mongoose.model("carts");

productExistInCart = (items, productId) => {
  const filteredItems = items.filter(item => item.product.equals(productId));
  console.log(filteredItems);
  if (filteredItems.length > 0) {
    return true;
  }
  return false;
};
module.exports = app => {
  //Add product to cart route
  app.post("/api/cart/add-product", requireToken, async (req, res) => {
    try {
      const cart = await Cart.findOne({ createdBy: req.user.id });
      if (cart) {
        console.log("cart already exist");
        //If product already exist in the cart update it's amount
        if (productExistInCart(cart.items, req.body.product)) {
          await Cart.findOneAndUpdate(
            {
              createdBy: req.user.id,
              "items.product": { $eq: req.body.product }
            },
            {
              $set: {
                "items.$.amount": req.body.amount
              }
            }
          );
          res.status(200).send();
          console.log("Product was successfully updated");
        } else {
          //If the cart exist but item does not exist
          await Cart.findOneAndUpdate(
            {
              createdBy: req.user.id
            },
            {
              $push: {
                items: {
                  product: req.body.product,
                  amount: req.body.amount
                }
              }
            }
          );
        }
        res.status(200).send();
      } else {
        //creates a new cart
        const createdCart = await new Cart({
          items: [{ product: req.body.product, amount: req.body.amount }],
          createdBy: req.user.id
        }).save();
        res.status(200).send(createdCart);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

  app.get("/api/get-user-cart", requireToken, async (req, res) => {
    try {
      const cart = await Cart.findOne({ createdBy: req.user.id }).populate(
        "items.product"
      );
      if (cart) {
        res.status(200).send(cart);
      } else {
        res.status(200).send({ items: [] });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });
};
