import React from "react";

export default React.createContext({
  id: "",
  title: "",
  desc: "",
  price: "",
  images: [],
  amount: 0,
  details: "",
  onAddProductToCart: () => {}
});
