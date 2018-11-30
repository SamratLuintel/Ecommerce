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

export const addProduct = data => async dispatch => {
  try {
    const res = await axios.post("/api/add-product", data);
  } catch (error) {
    console.log("Error from add product", error.response);
    throw error.response ? error.response.data : {};
  }
};
