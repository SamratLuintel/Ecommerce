import axios from "axios";
import {
  UPDATE_PUBLIC_PRODUCTS,
  SET_PUBLIC_PRODUCT_CATEGORY_FILTER
} from "../../../types";

export const fetchPublicProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/products");
    dispatch({
      type: UPDATE_PUBLIC_PRODUCTS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const setPublicProductCategoryFilter = id => async dispatch => {
  try {
    dispatch({
      type: SET_PUBLIC_PRODUCT_CATEGORY_FILTER,
      payload: id
    });
  } catch (error) {}
};
