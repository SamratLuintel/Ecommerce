import React, { Component } from "react";
import { addCategory } from "../../../store/actions/categories/categories";

import { connect } from "react-redux";

class AddCategory extends Component {
  state = {
    title: "",
    slug: "",
    content: "",
    titleError: "",
    slugError: "",
    contentError: ""
  };

  onTitleChange = e => this.setState({ title: e.target.value, titleError: "" });

  onSlugChange = e => this.setState({ slug: e.target.value });

  onCreateCategory = async () => {
    const { title } = this.state;
    try {
      await this.props.addCategory(title);
    } catch (err) {
      this.setFormError(err);
    }
  };

  setFormError = error => {
    if (error.title) this.setState({ titleError: error.title });
  };

  onBlur = evt => {
    console.log("onBlur event called with event info: ", evt);
  };

  afterPaste = evt => {
    console.log("afterPaste event called with event info: ", evt);
  };
  render() {
    return (
      <div className="Add Category">
        <h2>Add Category Page</h2>
        <h3>Title</h3>
        <textarea
          cols="30"
          rows="1"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        {this.state.titleError}
        <button onClick={this.onCreateCategory}>Create a Category</button>
      </div>
    );
  }
}
export default connect(
  null,
  { addCategory }
)(AddCategory);
