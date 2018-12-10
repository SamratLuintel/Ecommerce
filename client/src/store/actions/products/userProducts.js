import axios from "axios";
import {
  UPDATE_FEATURED_PRODUCTS,
  UPDATE_POPULAR_PRODUCTS,
  UPDATE_RECENT_PRODUCTS,
  UPDATE_PRODUCTS_PER_CATEGORY
} from "../../types";

export const fetchFeaturedProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/products/featured");
    console.log("featured product is fetched", res.data);
    dispatch({
      type: UPDATE_FEATURED_PRODUCTS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchPopularProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/products/popular");
    console.log("popular product is fetched", res.data);
    dispatch({
      type: UPDATE_POPULAR_PRODUCTS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecentProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/products/recent");
    console.log("popular product is fetched", res.data);
    dispatch({
      type: UPDATE_RECENT_PRODUCTS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductPerCategory = categoryId => async dispatch => {
  try {
    const res = await axios.get(`/api/product/per-category/${categoryId}`);
    console.log("Fetch product per category is called", res.data);
    dispatch({
      type: UPDATE_PRODUCTS_PER_CATEGORY,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
