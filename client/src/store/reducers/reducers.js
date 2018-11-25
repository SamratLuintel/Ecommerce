import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import pagesReducer from "./pagesReducer";

export default combineReducers({
  profile: profileReducer,
  pages: pagesReducer
});
