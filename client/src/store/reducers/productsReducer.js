import {
  UPDATE_PUBLIC_PRODUCTS,
  SET_PUBLIC_PRODUCT_CATEGORY_FILTER,
  UPDATE_FEATURED_PRODUCTS
} from "../types";

const initialState = {
  //Below fetched variable is for the list of all pages on /pages route
  fetched: false,
  lists: [],
  categoryFilter: null,
  //Holds the list of featured product
  featured: {
    fetched: false,
    lists: []
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PUBLIC_PRODUCTS:
      return { ...state, lists: payload, fetched: true };

    case SET_PUBLIC_PRODUCT_CATEGORY_FILTER:
      return { ...state, categoryFilter: payload };

    case UPDATE_FEATURED_PRODUCTS:
      return { ...state, featured: { fetched: true, lists: payload } };
    default:
      return state;
  }
};
