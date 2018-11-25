import axios from "axios";
import { UPDATE_USER_LOGGEDIN, UPDATE_USER_LOGGEDOUT } from "../../types";
import setAuthToken from "../../../utils/setAuthToken";

export const fetchUser = token => async dispatch => {
  //At first we will check if the user is just logging in
  //At that case token parameter contains token send from the server
  if (token) {
    try {
      console.log("token from fethcUser", token);
      const res = await axios.get("/api/auth/get-user", {
        headers: { authorization: token }
      });
      localStorage.setItem("ecommerceToken", token);
      //set the authorization header in every request
      setAuthToken(token);
      return dispatch({ type: UPDATE_USER_LOGGEDIN, payload: res.data });
    } catch (err) {
      return dispatch({ type: UPDATE_USER_LOGGEDOUT });
    }
  }
  //If not we will check if the token exist in local storage
  //Then we will validate it
  const localToken = localStorage.getItem("ecommerceToken");
  if (localToken) {
    console.log("local token is called", localToken);
    try {
      const res = await axios.get("/api/auth/get-user", {
        headers: {
          authorization: localToken
        }
      });
      //set the authorization header in every request
      setAuthToken(localToken);
      return dispatch({
        type: UPDATE_USER_LOGGEDIN,
        payload: res.data
      });
    } catch (error) {
      return dispatch({
        type: UPDATE_USER_LOGGEDOUT
      });
    }
  }

  console.log("Login part is called");
  //If none of the above passes the user is not logged in at all
  dispatch({
    type: UPDATE_USER_LOGGEDOUT
  });
};
