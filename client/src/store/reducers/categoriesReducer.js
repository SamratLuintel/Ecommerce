import { UPDATE_CATEGORIES, UPDATE_EDIT_CATEGORY } from "../types";

const initialState = {
  //Below fetched variable is for the list of all pages on /pages route
  fetched: false,
  lists: [],

  editCategory: {
    fetched: false
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CATEGORIES:
      return { ...state, lists: payload, fetched: true };
    case UPDATE_EDIT_CATEGORY:
      return {
        ...state,
        editCategory: {
          fetched: true,
          ...payload
        }
      };
    default:
      return state;
  }
};
