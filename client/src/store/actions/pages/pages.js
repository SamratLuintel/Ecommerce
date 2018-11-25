import axios from "axios";
import { UPDATE_PAGES } from "../../types";

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
