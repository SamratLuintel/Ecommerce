import {
  UPDATE_PUBLIC_PRODUCTS,
  SET_PUBLIC_PRODUCT_CATEGORY_FILTER
} from "../../types";

const initialState = {
  //Below fetched variable is for the list of all pages on /pages route
  fetched: false,
  lists: [],
  categoryFilter: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PUBLIC_PRODUCTS:
      return { ...state, lists: payload, fetched: true };
    case SET_PUBLIC_PRODUCT_CATEGORY_FILTER:
      return { ...state, categoryFilter: payload };
    default:
      return state;
  }
};