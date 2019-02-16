import {
  UPDATE_PUBLIC_PRODUCTS,
  SET_PUBLIC_PRODUCT_CATEGORY_FILTER,
  UPDATE_FEATURED_PRODUCTS,
  UPDATE_POPULAR_PRODUCTS,
  UPDATE_PRODUCTS_PER_CATEGORY,
  UPDATE_RECENT_PRODUCTS,
  UPDATE_PRODUCTS_OF_CATEGORIES,
  UPDATE_PRODUCTS_OF_CATEGORIES_SCROLLABLE,
  RESET_PRODUCTS_OF_CATEGORIES,
  UPDATE_SEARCHED_PRODUCTS,
  RESET_SEARCHED_PRODUCTS
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
  },
  //Hold the list of popular product
  popular: {
    fetched: false,
    lists: []
  },
  //Hold the list of recent products
  recent: {
    fetched: false,
    lists: []
  },

  //Fetch the products when the user is visiting categories page
  categories: {
    fetched: false,
    lists: [],
    scrollable: true
  },

  searchedProducts: {
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

    case UPDATE_POPULAR_PRODUCTS:
      return { ...state, popular: { fetched: true, lists: payload } };

    case UPDATE_RECENT_PRODUCTS:
      return { ...state, recent: { fetched: true, lists: payload } };

    case UPDATE_PRODUCTS_PER_CATEGORY:
      return {
        ...state,
        //payload.category is the id
        [payload.category]: {
          lists: payload.products
        }
      };

    case UPDATE_PRODUCTS_OF_CATEGORIES:
      return {
        ...state,
        categories: {
          ...state.categories,
          lists: [...state.categories.lists, ...payload]
        }
      };

    case UPDATE_PRODUCTS_OF_CATEGORIES_SCROLLABLE:
      return {
        ...state,
        categories: {
          ...state.categories,
          scrollable: false
        }
      };

    case RESET_PRODUCTS_OF_CATEGORIES:
      return {
        ...state,
        categories: {
          fetched: false,
          lists: [],
          scrollable: true
        }
      };

    case UPDATE_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: {
          fetched: true,
          lists: payload
        }
      };

    case RESET_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: {
          ...state.searchedProducts,
          fetched: false,
          lists: []
        }
      };
    default:
      return state;
  }
};
