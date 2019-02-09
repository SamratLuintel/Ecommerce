import React, { Component } from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

class AdminSideNav extends Component {
  state = {
    shrinked: false
  };

  redirectTo = name => {
    this.props.history.push(`/admin/${name}`);
  };

  onShrink = bool => {
    this.setState({ shrinked: bool });
  };
  render() {
    //props.nav is set in the respected component
    //props.nav ==='dashboard' is passed from Dashboard component
    return (
      <div
        className={classnames({
          AdminSideNav: true,
          "AdminSideNav--shrink": this.state.shrinked
        })}
      >
        <h2 className="AdminSideNav__header">
          Mart Admin
          <span
            class="AdminSideNav__header__shrink-btn"
            onClick={() => this.onShrink(true)}
          >
            <i className="fas fa-times" />
          </span>
        </h2>
        <div className="AdminSideNav__nav-lists">
          <div
            className={classnames({
              AdminSideNav__nav: true,
              "AdminSideNav__nav--selected": this.props.nav === "dashboard"
            })}
            onClick={() => this.redirectTo("dashboard")}
          >
            <i className="fas fa-home" />
            <span className="AdminSideNav__nav__text">Dashboard</span>
          </div>
          <div
            className={classnames({
              AdminSideNav__nav: true,
              "AdminSideNav__nav--selected": this.props.nav === "admin-products"
            })}
            onClick={() => this.redirectTo("products")}
          >
            <i class="fas fa-tv" />
            <span className="AdminSideNav__nav__text">Products</span>
          </div>
          <div
            className={classnames({
              AdminSideNav__nav: true,
              "AdminSideNav__nav--selected":
                this.props.nav === "admin-categories"
            })}
            onClick={() => this.redirectTo("categories")}
          >
            <i className="fas fa-shopping-cart" />
            <span className="AdminSideNav__nav__text">Categories</span>
          </div>
          <div
            className={classnames({
              AdminSideNav__nav: true,
              "AdminSideNav__nav--selected": this.props.nav === "add-product"
            })}
            onClick={() => this.redirectTo("add-product")}
          >
            <i className="fab fa-product-hunt" />
            <span className="AdminSideNav__nav__text">Add Product</span>
          </div>
          <div
            className={classnames({
              AdminSideNav__nav: true,
              "AdminSideNav__nav--selected": this.props.nav === "add-category"
            })}
            onClick={() => this.redirectTo("add-category")}
          >
            <i className="fas fa-tags" />
            <span className="AdminSideNav__nav__text">Add Category</span>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(AdminSideNav);
