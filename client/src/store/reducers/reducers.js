import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import pagesReducer from "./pagesReducer";
import categoriesReducer from "./categoriesReducer";
import productsReducer from "./productsReducer";
import publicCategoriesReducer from "./public/publicCategoriesReducer";
import publicPagesReducer from "./public/publicPagesReducer";
import publicProductsReducer from "./public/publicProductsReducer";

export default combineReducers({
  profile: profileReducer,
  pages: pagesReducer,
  categories: categoriesReducer,
  products: productsReducer,
  /*
  Public means created by other users too. Above reducers are for admin settings page
    while the below "publicX" reducers are for home page
  */
  publicCategories: publicCategoriesReducer,
  publicPages: publicPagesReducer,
  publicProducts: publicProductsReducer
});
