import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { deletePage, fetchPages } from "../../../store/actions/pages/pages";
import { connect } from "react-redux";

class Category extends Component {
  redirectToEditCategory = () => {
    const id = this.props.id;
    this.props.history.push(`/admin/edit-page/${id}`);
  };

  onDeleteCategory = async () => {
    const id = this.props.id;
    await this.props.deletePage(id);
    this.props.fetchPages();
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
    { deletePage, fetchPages }
  )(Category)
);
