import React from "react";

export default React.createContext({
  id: "",
  title: "",
  hasReviewed: null,
  desc: "",
  price: "",
  images: [],
  amount: 0,
  details: "",
  reviews: [],
  //Three options
  //details , reviews and add-review
  selectedTab: "details",
  onAddProductToCart: () => {},
  fetchProduct: () => {},
  onSelectedTabChange: () => {}
});
