import { UPDATE_KEYS } from "../../types";
import axios from "axios";

export const fetchKeys = () => async dispatch => {
  try {
    const res = await axios.get("/api/profileInfo/keys");
    dispatch({
      type: UPDATE_KEYS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
