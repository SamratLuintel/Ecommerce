import React, { Component } from "react";
import { connect } from "react-redux";
import { getEditPage, updatePage } from "../../../store/actions/pages/pages";

class EditPage extends Component {
  state = {
    disabled: true,
    title: "",
    content: "",
    titleError: "",
    contentError: ""
  };

  static getDerivedStateFromProps = (nextProps, nextState) => {
    //The below condition will make sure  "if" statement is called
    //only once during the entire component period when it's condition
    //passes once
    if (nextProps.editPage.fetched && nextState.disabled) {
      console.log("This static method is caleld", nextProps.editPage.title);
      return {
        title: nextProps.editPage.title,
        slug: nextProps.editPage.slug,
        content: nextProps.editPage.content,
        disabled: false
      };
    }

    return null;
  };

  componentDidUpdate = (prevProps, prevState) => {
    //Fetched the edit page
    if (this.props.profile.authenticated && !this.props.editPage.fetched) {
      const id = this.props.match.params.id;
      this.props.getEditPage(id);
    }
  };

  onSavePage = async () => {
    const page = {
      id: this.props.match.params.id,
      title: this.state.title,
      slug: this.state.slug,
      content: this.state.content
    };
    try {
      await this.props.updatePage(page);
    } catch (err) {
      this.setFormError(err);
    }
  };

  setFormError = error => {
    if (error.title) this.setState({ titleError: error.title });
    if (error.content) this.setState({ contentError: error.content });
  };

  onTitleChange = e => this.setState({ title: e.target.value, titleError: "" });
  onContentChange = e =>
    this.setState({ content: e.target.value, contentError: "" });

  render() {
    return (
      <div className="AddPage">
        <h2>This is An Edit Page</h2>
        <h3>Title</h3>
        <textarea
          cols="30"
          rows="1"
          disabled={this.state.disabled}
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        {this.state.titleError}
        <h3>Content</h3>
        <textarea
          value={this.state.content}
          onChange={this.onContentChange}
          disabled={this.state.disabled}
          cols="30"
          rows="1"
        />
        {this.state.contentError}
        <button onClick={this.onSavePage}>Save the page</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  editPage: state.pages.editPage
});
export default connect(
  mapStateToProps,
  { getEditPage, updatePage }
)(EditPage);
