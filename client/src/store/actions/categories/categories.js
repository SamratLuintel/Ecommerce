import axios from "axios";
import { UPDATE_CATEGORIES, UPDATE_EDIT_CATEGORIES } from "../../types";

export const fetchCategories = () => async dispatch => {
  try {
    const res = await axios.get("/api/categories");
    dispatch({
      type: UPDATE_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    console.log("Some error occured while fetching the categories", err);
  }
};

export const addCategory = title => async dispatch => {
  try {
    console.log("Add Category Action is Called");
    const res = await axios.post("/api/add-category", { title });
    console.log("The category is successfully added");
  } catch (err) {
    const errMessage = err.response ? err.response.data : err.response;
    console.log("Add Category errors", errMessage);
    throw errMessage;
  }
};
