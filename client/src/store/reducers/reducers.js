import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import pagesReducer from "./pagesReducer";
import categoriesReducer from "./categoriesReducer";
import productsReducer from "./productsReducer";

export default combineReducers({
  profile: profileReducer,
  pages: pagesReducer,
  categories: categoriesReducer,
  products: productsReducer
});
