import { UPDATE_PRODUCTS, UPDATE_EDIT_PRODUCT } from "../types";

const initialState = {
  //Below fetched variable is for the list of all pages on /pages route
  fetched: false,
  lists: [],

  editProduct: {
    fetched: false
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PRODUCTS:
      return { ...state, lists: payload, fetched: true };
    case UPDATE_EDIT_PRODUCT:
      return {
        ...state,
        editProduct: {
          fetched: true,
          ...payload
        }
      };
    default:
      return state;
  }
};
