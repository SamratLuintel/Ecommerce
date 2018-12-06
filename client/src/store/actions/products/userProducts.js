import axios from "axios";
import { UPDATE_FEATURED_PRODUCTS } from "../../types";

export const fetchFeaturedProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/product/featured");
    console.log("featured product is fetched", res.data);
    dispatch({
      type: UPDATE_FEATURED_PRODUCTS,
      payload: res.data
    });
  } catch (error) {}
};
