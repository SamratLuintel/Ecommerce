import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getEditCategory,
  updateCategory
} from "../../../store/actions/categories/categories";

class EditCategory extends Component {
  state = {
    disabled: true,
    title: "",
    titleError: ""
  };

  static getDerivedStateFromProps = (nextProps, nextState) => {
    //The below condition will make sure  "if" statement is called
    //only once during the entire component period when it's condition
    //passes once
    if (nextProps.editCategory.fetched && nextState.disabled) {
      return {
        title: nextProps.editCategory.title,
        disabled: false
      };
    }

    return null;
  };

  componentDidUpdate = (prevProps, prevState) => {
    //Fetched the edit page
    if (this.props.profile.authenticated && !this.props.editCategory.fetched) {
      const id = this.props.match.params.id;
      this.props.getEditCategory(id);
    }
  };

  componentDidMount = () => {
    if (this.props.profile.authenticated && !this.props.editCategory.fetched) {
      const id = this.props.match.params.id;
      this.props.getEditCategory(id);
    }
  };

  onSaveCategory = async () => {
    const category = {
      id: this.props.match.params.id,
      title: this.state.title
    };
    try {
      await this.props.updateCategory(category);
    } catch (err) {
      this.setFormError(err);
    }
  };

  setFormError = error => {
    if (error.title) this.setState({ titleError: error.title });
    if (error.content) this.setState({ contentError: error.content });
  };

  onTitleChange = e => this.setState({ title: e.target.value, titleError: "" });
  render() {
    return (
      <div className="Edit Category">
        <h2>This is An Edit Category</h2>
        <h3>Title</h3>
        <textarea
          cols="30"
          rows="1"
          disabled={this.state.disabled}
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        {this.state.titleError}
        <button onClick={this.onSaveCategory}>Saves the category</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  editCategory: state.categories.editCategory
});
export default connect(
  mapStateToProps,
  { getEditCategory, updateCategory }
)(EditCategory);
