import { combineReducers } from "redux";
import profileReducer from "./profileReducer";

import categoriesReducer from "./categoriesReducer";
import productsReducer from "./productsReducer";
import cartsReducer from "./cartsReducer";
import adminCategoriesReducer from "./admin/adminCategoriesReducer";
import adminProductsReducer from "./admin/adminProductsReducer";

export default combineReducers({
  profile: profileReducer,
  adminCategories: adminCategoriesReducer,
  adminProducts: adminProductsReducer,
  /*
  Public means created by other users too. Above reducers are for admin settings page
    while the below "publicX" reducers are for home page
  */
  categories: categoriesReducer,
  products: productsReducer,

  carts: cartsReducer
});
