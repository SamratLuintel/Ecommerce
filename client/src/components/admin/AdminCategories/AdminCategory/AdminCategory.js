import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteCategory,
  fetchAdminCategories
} from "../../../../store/actions/categories/adminCategories";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class AdminCategory extends Component {
  redirectToEditCategory = () => {
    const id = this.props.id;
    this.props.history.push(`/admin/edit-category/${id}`);
  };

  onDeleteCategory = async () => {
    const id = this.props.id;
    await this.props.deleteCategory(id);
    NotificationManager.info("Item have been deleted");
    this.props.fetchAdminCategories();
  };

  render() {
    const { props } = this;
    return (
      <div>
        <tr className="AdminCategory">
          <td className="AdminCategory__td AdminCategory__title">
            {props.title}
          </td>
          <td className="AdminCategory__td">
            <i className={props.icon} />
          </td>
          <td
            className="AdminCategory__td AdminCategory__action-btn"
            onClick={this.redirectToEditCategory}
          >
            Edit
          </td>
          <td
            className="AdminCategory__td AdminCategory__action-btn"
            onClick={this.onDeleteCategory}
          >
            Delete
          </td>
        </tr>
        <NotificationContainer />
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
