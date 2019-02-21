import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdminCategories } from "../../../store/actions/categories/adminCategories";
import AdminCategory from "./AdminCategory/AdminCategory";
import AdminHeader from "../../common/admin/AdminHeader/AdminHeader";
import AdminSideNav from "../../common/admin/AdminSideNav/AdminSideNav";
import { withRouter } from "react-router-dom";

class AdminCategories extends Component {
  state = {
    nav: "admin-categories"
  };
  componentDidUpdate = (prevProps, prevState) => {
    //Fetched the edit page
    if (this.props.profile.authenticated && !this.props.categories.fetched) {
      this.props.fetchAdminCategories();
    }
  };

  componentDidMount = () => {
    if (this.props.profile.authenticated && !this.props.categories.fetched) {
      this.props.fetchAdminCategories();
    }
  };

  renderCategories = () => {
    if (this.props.categories.fetched && this.props.profile.authenticated) {
      return this.props.categories.lists.map(category => {
        return (
          <AdminCategory
            icon={category.icon}
            title={category.title}
            id={category._id}
          />
        );
      });
    }
  };

  redirectToCreateCategory = () => {
    this.props.history.push("/admin/add-category");
  };

  render() {
    let content = (
      <table className="AdminCategories__table">
        <thead className="AdminCategories__header">
          <tr className="AdminCategories__header__tr">
            <th className="AdminCategories__header__item">Category Name</th>
            <th className="AdminCategories__header__item">Icon</th>
            <th className="AdminCategories__header__item">Edit</th>
            <th className="AdminCategories__header__item">Delete</th>
          </tr>
        </thead>
        <tbody> {this.renderCategories()}</tbody>
      </table>
    );

    if (
      this.props.categories.fetched &&
      this.props.categories.lists.length === 0
    ) {
      console.log("Alternate categories condition is called");
      content = <p>You have not created any categories</p>;
    }
    return (
      <div className="AdminCategories">
        <AdminSideNav nav={this.state.nav} />
        {/* Margin left of 260px */}
        <div className="AdminCategories__main-area admin-default-left-margin-mid">
          <AdminHeader />
          <div className="AdminCategories__main-area__content">
            <div className="AdminCategories__create-btn-wrapper">
              <button
                className="AdminCategories__create-btn"
                onClick={this.redirectToCreateCategory}
              >
                Create A Category
              </button>
            </div>

            {content}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  categories: state.adminCategories
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchAdminCategories }
  )(AdminCategories)
);
