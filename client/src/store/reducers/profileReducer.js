import { UPDATE_USER_LOGGEDIN, UPDATE_USER_LOGGEDOUT } from "../types";

const initialState = {
  fetched: false,
  authenticated: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_LOGGEDIN:
      return {
        fetched: true,
        authenticated: true,
        username: payload.username,
        fullname: payload.fullname,
        id: payload._id
      };
    case UPDATE_USER_LOGGEDOUT:
      return {
        fetched: true,
        authenticated: false
      };
    default:
      return state;
  }
};
