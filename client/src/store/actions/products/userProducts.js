import axios from "axios";
import {
  UPDATE_FEATURED_PRODUCTS,
  UPDATE_POPULAR_PRODUCTS,
  UPDATE_RECENT_PRODUCTS,
  UPDATE_PRODUCTS_PER_CATEGORY,
  UPDATE_PRODUCTS_OF_CATEGORIES_SCROLLABLE,
  UPDATE_PRODUCTS_OF_CATEGORIES,
  RESET_PRODUCTS_OF_CATEGORIES,
  UPDATE_SEARCHED_PRODUCTS,
  RESET_SEARCHED_PRODUCTS
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

//It fetches a single product
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

//It fetches all the needed products of a particular category
export const fetchProductsOfCategories = (
  categoryId,
  skip,
  limit
) => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${categoryId}/${skip}/${limit}`);
    console.log("fetch products of categories", res.data);

    if (!res.data || res.data.length === 0) {
      dispatch({
        type: UPDATE_PRODUCTS_OF_CATEGORIES_SCROLLABLE,
        payload: false
      });
    }

    dispatch({
      type: UPDATE_PRODUCTS_OF_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetProductsOfCategories = () => async dispatch => {
  dispatch({
    type: RESET_PRODUCTS_OF_CATEGORIES
  });
};

export const fetchProductBySearchText = text => async dispatch => {
  try {
    const res = await axios.get(`/api/products/find/${text}`);
    console.log("Fetch products by search text", res.data);
    dispatch({
      type: UPDATE_SEARCHED_PRODUCTS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetSearchProducts = () => async dispatch => {
  dispatch({
    type: RESET_SEARCHED_PRODUCTS
  });
};
