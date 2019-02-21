import {
  UPDATE_USER_LOGGEDIN,
  UPDATE_USER_LOGGEDOUT,
  UPDATE_KEYS
} from "../types";

const initialState = {
  fetched: false,
  authenticated: false,
  keys: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_LOGGEDIN:
      return {
        ...state,
        fetched: true,
        authenticated: true,
        username: payload.username,
        fullname: payload.fullname,
        id: payload._id
      };
    case UPDATE_USER_LOGGEDOUT:
      return {
        ...state,
        fetched: true,
        authenticated: false
      };
    case UPDATE_KEYS:
      return {
        ...state,
        keys: payload
      };
    default:
      return state;
  }
};
