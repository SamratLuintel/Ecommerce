import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdminCategories } from "../../../store/actions/categories/adminCategories";
import AdminCategory from "./AdminCategory/AdminCategory";
import { withRouter } from "react-router-dom";

class AdminCategories extends Component {
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
        return <AdminCategory title={category.title} id={category._id} />;
      });
    }
  };

  redirectToCreateCategory = () => {
    this.props.history.push("/add-category");
  };

  render() {
    return (
      <div className="Categories">
        <button onClick={this.redirectToCreateCategory}>
          Create A Category
        </button>
        <thead>
          <tr>
            <th>Categories</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {this.renderCategories()}
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
