import { UPDATE_CATEGORIES } from "../types";

const initialState = {
  //Below fetched variable is for the list of all pages on /pages route
  fetched: false,
  lists: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CATEGORIES:
      return { ...state, lists: payload, fetched: true };
    default:
      return state;
  }
};
