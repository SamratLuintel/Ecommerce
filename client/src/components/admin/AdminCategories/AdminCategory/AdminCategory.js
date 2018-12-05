import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteCategory,
  fetchAdminCategories
} from "../../../../store/actions/categories/adminCategories";

class AdminCategory extends Component {
  redirectToEditCategory = () => {
    const id = this.props.id;
    this.props.history.push(`/admin/edit-category/${id}`);
  };

  onDeleteCategory = async () => {
    const id = this.props.id;
    await this.props.deleteCategory(id);
    this.props.fetchAdminCategories();
  };
  render() {
    const { props } = this;
    return (
      <div>
        <tbody>
          <tr>
            <td>{props.title}</td>
            <td onClick={this.redirectToEditCategory}>Edit</td>
            <td onClick={this.onDeleteCategory}>Delete</td>
          </tr>
        </tbody>
      </div>
    );
  }
}
export default withRouter(
  connect(
    null,
    { deleteCategory, fetchAdminCategories }
  )(AdminCategory)
);
