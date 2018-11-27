import { UPDATE_PAGES, UPDATE_EDIT_PAGE } from "../types";

const initialState = {
  //Below fetched variable is for the list of all pages on /pages route
  fetched: false,
  lists: [],

  editPage: {
    fetched: false
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PAGES:
      return { ...state, lists: payload, fetched: true };
    case UPDATE_EDIT_PAGE:
      return {
        ...state,
        editPage: {
          fetched: true,
          ...payload
        }
      };
    default:
      return state;
  }
};