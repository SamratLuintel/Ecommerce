import axios from "axios";
import { UPDATE_PUBLIC_CATEGORIES } from "../../../types";

export const fetchPublicCategories = () => async dispatch => {
  try {
    const res = await axios.get("/api/categories");
    console.log("Public categories are fetched");
    dispatch({
      type: UPDATE_PUBLIC_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
