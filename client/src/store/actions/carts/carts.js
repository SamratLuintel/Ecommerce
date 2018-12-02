import axios from "axios";
import { UPDATE_CART_ITEMS } from "../../types";

export const addProductToCart = data => async dispatch => {
  console.log("Add product to card has been called");
  try {
    const res = await axios.post("/api/cart/add-product", data);
    console.log("Product has been successfully added to cart");
  } catch (error) {
    console.log("Oops some error have occured");
  }
};

export const fetchCart = () => async dispatch => {
  console.log("Fetch cart have been called");
  try {
    const res = await axios.get("/api/get-user-cart");
    console.log("response from fetch cart", res.data);
    dispatch({
      type: UPDATE_CART_ITEMS,
      payload: res.data.items
    });
  } catch (error) {
    console.log(error);
  }
};
