import React, { Component } from "react";
import CategoriesDropDown from "./CategoriesDropDown/CategoriesDropDown";

class HeaderNavbar extends Component {
  render() {
    return (
      <div className="HeaderNavbar">
        <div className="container">
          <CategoriesDropDown />
        </div>
      </div>
    );
  }
}

export default HeaderNavbar;
