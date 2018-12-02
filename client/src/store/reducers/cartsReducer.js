import { UPDATE_CART_ITEMS } from "../types";

const initialState = {
  totalItems: 0,
  items: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CART_ITEMS:
      return { ...state, totalItems: payload.length, items: payload };

    default:
      return state;
  }
};
