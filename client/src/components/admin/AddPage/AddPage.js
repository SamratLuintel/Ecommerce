import React, { Component } from "react";
import AddPageContent from "./AddPageContent/AddPageContent";
import AddPageContext from "./add-page-context";
import { addPage } from "../../../store/actions/pages/pages";
import { connect } from "react-redux";
import CKEditor from "react-ckeditor-component";

class AddPage extends Component {
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

  onContentChange = evt => {
    const newContent = evt.editor.getData();
    this.setState({
      content: newContent,
      contentError: ""
    });
  };

  onCreatePage = async () => {
    const { title, slug, content } = this.state;
    try {
      await this.props.addPage(title, slug, content);
    } catch (err) {
      this.setFormError(err);
    }
  };

  setFormError = error => {
    if (error.title) this.setState({ titleError: error.title });
    if (error.content) this.setState({ contentError: error.content });
    if (error.slug) this.setState({ slugError: error.slug });
  };

  onBlur = evt => {
    console.log("onBlur event called with event info: ", evt);
  };

  afterPaste = evt => {
    console.log("afterPaste event called with event info: ", evt);
  };
  render() {
    const handlers = {
      onTitleChange: this.onTitleChange,
      onSlugChange: this.onSlugChange,
      onContentChange: this.onContentChange
    };
    return (
      <AddPageContext.Provider value={{ ...this.state, ...handlers }}>
        <div className="AddPage">
          <h2>This is An Add page</h2>
          <h3>Title</h3>
          <textarea
            cols="30"
            rows="1"
            value={this.state.title}
            onChange={this.onTitleChange}
          />
          {this.state.titleError}
          <h3>Slug</h3>
          <textarea
            value={this.state.slug}
            onChange={this.onSlugChange}
            cols="30"
            rows="1"
          />
          {this.state.slugError}

          <CKEditor
            activeClass="p10"
            content={this.state.content}
            events={{
              blur: this.onBlur,
              afterPaste: this.afterPaste,
              change: this.onContentChange
            }}
          />
          <button onClick={this.onCreatePage}>Create a Page</button>
        </div>
      </AddPageContext.Provider>
    );
  }
}
export default connect(
  null,
  { addPage }
)(AddPage);
