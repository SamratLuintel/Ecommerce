import React, { Component } from "react";

class AdminSideNav extends Component {
  render() {
    return (
      <div className="AdminSideNav">
        <h2 className="AdminSideNav__header">Mart Admin</h2>
        <div className="AdminSideNav__nav-lists">
          <div className="AdminSideNav__nav AdminSideNav__nav--selected">
            <i class="fas fa-home" />
            <span className="AdminSideNav__nav__text">Dashboard</span>
          </div>
          <div className="AdminSideNav__nav">
            <i class="fas fa-tv" />
            <span className="AdminSideNav__nav__text">Templates</span>
          </div>
          <div className="AdminSideNav__nav">
            <i class="fas fa-shopping-cart" />
            <span className="AdminSideNav__nav__text">Products</span>
          </div>
          <div className="AdminSideNav__nav">
            <i class="fab fa-product-hunt" />
            <span className="AdminSideNav__nav__text">Add Product</span>
          </div>
        </div>
      </div>
    );
  }
}
export default AdminSideNav;
