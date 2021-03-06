import axios from "axios";
import {
  UPDATE_PRODUCTS,
  UPDATE_EDIT_PRODUCT,
  RESET_EDIT_PRODUCT
} from "../../types";

export const uploadProductImages = images => {};

export const fetchAdminProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/admin-products");
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

export const getEditProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/admin-product/${id}`);
    dispatch({
      type: UPDATE_EDIT_PRODUCT,
      payload: res.data
    });
  } catch (error) {
    throw error;
    console.log(error.response);
  }
};

//Updates the product
export const updateProduct = product => async dispatch => {
  try {
    const res = await axios.post(`/api/admin-product/${product.id}`, product);
    dispatch({
      type: UPDATE_EDIT_PRODUCT,
      payload: res.data
    });
    console.log("Product is successfully updated");
  } catch (error) {
    console.log(error);
  }
};

export const resetEditProduct = () => async dispatch => {
  dispatch({
    type: RESET_EDIT_PRODUCT
  });
};

//Delete the product
export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(`/api/admin-product/${id}`);
    return;
  } catch (error) {
    console.log(error);
  }
};
