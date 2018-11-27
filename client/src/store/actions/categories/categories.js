import axios from "axios";
import { UPDATE_CATEGORIES, UPDATE_EDIT_CATEGORY } from "../../types";

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

//Add the category
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

//Gets the category selected for edit view
export const getEditCategory = id => async dispatch => {
  try {
    const res = await axios.get(`/api/category/${id}`);
    dispatch({
      type: UPDATE_EDIT_CATEGORY,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response);
  }
};
//Updates the category
export const updateCategory = category => async dispatch => {
  try {
    const res = await axios.post(`/api/category/${category.id}`, category);
    dispatch({
      type: UPDATE_EDIT_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    const errMessage = err.response ? err.response.data : err.response;
    console.log("Edit category errors", errMessage);
    throw errMessage;
  }
};
