import React, { Component } from "react";
import AddPageContext from "../add-page-context";

class AddPageContent extends Component {
  static contextType = AddPageContext;
  render() {
    return (
      <div className="AddPageContent">
        <textarea
          cols="30"
          rows="10"
          onChange={this.context.onContentChange}
          value={this.context.content}
        />
        {this.context.contentError}
      </div>
    );
  }
}
export default AddPageContent;
