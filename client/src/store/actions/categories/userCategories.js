import axios from "axios";
import { UPDATE_CATEGORIES } from "../../types";

export const fetchCategories = () => async dispatch => {
  try {
    const res = await axios.get("/api/categories");
    console.log("Public categories are fetched");
    dispatch({
      type: UPDATE_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
