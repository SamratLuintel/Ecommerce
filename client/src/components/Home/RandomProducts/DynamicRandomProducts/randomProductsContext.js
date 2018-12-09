import React from "react";

export default React.createContext({
  selectedCategory: "",
  displayCategories: [],
  onSelectedCategoryChange: () => {}
});
