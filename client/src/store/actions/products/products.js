import axios from "axios";
import { UPDATE_PRODUCTS } from "../../types";

export const uploadProductImages = images => {};

export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/products");
    dispatch({
      type: UPDATE_PRODUCTS,
      payload: res.data
    });
  } catch (error) {
    console.log("Some error occured while fetching the products", error);
  }
};
