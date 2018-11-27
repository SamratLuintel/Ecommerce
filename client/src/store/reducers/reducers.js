import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import pagesReducer from "./pagesReducer";
import categoriesReducer from "./categoriesReducer";

export default combineReducers({
  profile: profileReducer,
  pages: pagesReducer,
  categories: categoriesReducer
});
