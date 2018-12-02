import axios from "axios";
import { UPDATE_PAGES, UPDATE_EDIT_PAGE } from "../../types";

export const fetchPages = () => async dispatch => {
  try {
    const res = await axios.get("/api/pages");
    dispatch({
      type: UPDATE_PAGES,
      payload: res.data
    });
  } catch (error) {
    console.log("Some error occured while fetching the pages", error);
  }
};

export const addPage = (title, slug, content) => async dispatch => {
  try {
    const res = await axios.post("/api/add-page", { title, slug, content });
    console.log("The page is successfully added");
  } catch (err) {
    const errMessage = err.response ? err.response.data : err.response;
    console.log("Add page errors", errMessage);
    throw errMessage;
  }
};

//Gets the page selected for edit view
export const getEditPage = id => async dispatch => {
  try {
    const res = await axios.get(`/api/admin-page/${id}`);
    dispatch({
      type: UPDATE_EDIT_PAGE,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response);
  }
};

//Updates the page
export const updatePage = page => async dispatch => {
  try {
    const res = await axios.post(`/api/admin-page/${page.id}`, page);
    dispatch({
      type: UPDATE_EDIT_PAGE,
      payload: res.data
    });
  } catch (err) {
    const errMessage = err.response ? err.response.data : err.response;
    console.log("Edit page errors", errMessage);
    throw errMessage;
  }
};

//Deletes a page
export const deletePage = id => async dispatch => {
  try {
    await axios.delete(`/api/admin-page/${id}`);
    return;
  } catch (error) {
    console.log(error);
  }
};
