import axios from "axios";
import {
  UPDATE_CART_ITEMS,
  RESET_CART_ITEMS,
  UPDATE_CART_PRODUCT_AMOUNT
} from "../../types";

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
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetCart = () => dispatch => {
  dispatch({
    type: RESET_CART_ITEMS
  });
};

export const updateCartProductAmount = (index, amount) => dispatch => {
  dispatch({
    type: UPDATE_CART_PRODUCT_AMOUNT,
    payload: { index, amount }
  });
};

export const saveCart = (items, cartId) => async dispatch => {
  try {
    const res = await axios.post(`/api/save-cart/${cartId}`, { items });
    dispatch({
      type: UPDATE_CART_ITEMS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
