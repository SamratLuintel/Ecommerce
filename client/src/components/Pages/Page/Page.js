import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Page extends Component {
  redirectToEditPage = () => {
    const id = this.props.id;
    this.props.history.push(`/admin/edit-page/${id}`);
  };

  render() {
    const { props } = this;
    return (
      <div>
        <tbody>
          <tr>
            <td>{props.title}</td>
            <td onClick={this.redirectToEditPage}>Edit</td>
            <td>Delete</td>
          </tr>
        </tbody>
      </div>
    );
  }
}
export default withRouter(Page);
