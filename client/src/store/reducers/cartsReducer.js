import update from "immutability-helper";
import {
  UPDATE_CART_ITEMS,
  RESET_CART_ITEMS,
  UPDATE_CART_PRODUCT_AMOUNT,
  DELETE_CART_ITEM
} from "../types";

const initialState = {
  totalItems: 0,
  items: [],
  id: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CART_ITEMS:
      return {
        ...state,
        totalItems: payload.items.length,
        items: payload.items,
        id: payload._id
      };

    case RESET_CART_ITEMS:
      return {
        ...state,
        totalItems: 0,
        items: []
      };
    case UPDATE_CART_PRODUCT_AMOUNT:
      return update(state, {
        items: {
          [payload.index]: {
            amount: { $set: payload.amount }
          }
        }
      });
    case DELETE_CART_ITEM:
      return update(state, {
        items: {
          $splice: [[payload.index, 1]]
        }
      });
    default:
      return state;
  }
};
