import React, { Component } from "react";

class Page extends Component {
  render() {
    const { props } = this;
    return (
      <div>
        <tbody>
          <tr>
            <td>{props.title}</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </tbody>
      </div>
    );
  }
}
export default Page;
