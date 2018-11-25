import { UPDATE_PAGES } from "../types";

const initialState = {
  fetched: false,
  lists: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PAGES:
      return { ...state, lists: payload, fetched: true };

    default:
      return state;
  }
};
