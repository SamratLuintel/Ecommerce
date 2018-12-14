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

export const registerUser = data => async dispatch => {
  try {
    const res = await axios.post("/api/register", data);
    console.log("Register user response", res.data);
    dispatch(fetchUser(res.data.token));
  } catch (error) {
    console.log("Error from register user", error.response);
    throw error.response ? error.response.data : {};
  }
};

export const logInUser = data => async dispatch => {
  try {
    console.log("Login user have been called", data);
    const res = await axios.post("/api/login", data);
    console.log("Log In user have been called", res.data);
    dispatch(fetchUser(res.data.token));
  } catch (error) {
    console.log(error.response);
    throw error.response ? error.response.data : {};
  }
};

export const logOutUser = history => async dispatch => {
  try {
    await localStorage.removeItem("ecommerceToken");
    dispatch({
      type: UPDATE_USER_LOGGEDOUT
    });
    history.push("/home");
  } catch (error) {}
};
