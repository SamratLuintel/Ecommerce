import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getEditCategory,
  updateCategory,
  fetchAdminCategories
} from "../../../store/actions/categories/adminCategories";
import AdminHeader from "../../common/admin/AdminHeader/AdminHeader";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import classnames from "classnames";
import AdminSideNav from "../../common/admin/AdminSideNav/AdminSideNav";

class EditCategory extends Component {
  state = {
    disabled: true,
    title: "",
    icon: "",
    titleErr: "",
    saving: false
  };

  static getDerivedStateFromProps = (nextProps, nextState) => {
    //The below condition will make sure  "if" statement is called
    //only once during the entire component period when it's condition
    //passes once
    if (nextProps.editCategory.fetched && nextState.disabled) {
      return {
        title: nextProps.editCategory.title,
        icon: nextProps.editCategory.icon,
        disabled: false
      };
    }

    return null;
  };

  onIconChange = e => {
    this.setState({ icon: e.target.value });
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
    this.setState({ saving: true });
    const category = {
      id: this.props.match.params.id,
      title: this.state.title,
      icon: this.state.icon
    };
    try {
      await this.props.updateCategory(category);
      this.props.fetchAdminCategories();
      NotificationManager.info("Category have been updated");
      this.setState({ saving: false });
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
      <div className="EditCategory">
        <AdminSideNav />
        <div className="admin-default-left-margin-mid">
          <AdminHeader />
          <div className="EditCategory__main-area__wrapper">
            <div className="EditCategory__main-area__content">
              <h2 className="EditCategory__main-area__header">Edit Category</h2>
              <div className="EditCategory__main-area__icon-demo">
                <span>Icon: </span> <i className={this.state.icon} />
              </div>
              <div className="EditCategory__single-field EditCategory__single-field--no-bottom-margin">
                <h3 className="EditCategory__single-field__title">
                  Select Icon:
                </h3>
                <input
                  type="text"
                  className="EditCategory__single-field__input"
                  placeholder="Put classname of font-awesome icon"
                  value={this.state.icon}
                  onChange={this.onIconChange}
                />
              </div>
              <div className="EditCategory__short-info">
                Note:You must use just the classname of font-awesome icon. Visit{" "}
                <a
                  href="https://fontawesome.com/"
                  className="EditCategory__short-info__link"
                  target="_blank"
                >
                  https://fontawesome.com/
                </a>
              </div>
              <div className="EditCategory__single-field">
                <h3 className="EditCategory__single-field__title">Title:</h3>
                <input
                  type="text"
                  className={classnames({
                    "EditCategory__single-field__input": true,
                    "EditCategory__single-field__input--error": this.state
                      .titleErr
                  })}
                  placeholder="Provide the name of the category"
                  value={this.state.title}
                  onChange={this.onTitleChange}
                />
                {this.state.titleErr && (
                  <p className="EditCategory__single-field__error">
                    {this.state.titleErr}
                  </p>
                )}
              </div>

              <p />
              <button
                onClick={this.onSaveCategory}
                className="EditCategory__create-btn"
                disabled={this.state.saving}
              >
                Save
              </button>
            </div>
            <NotificationContainer />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  editCategory: state.adminCategories.editCategory
});
export default connect(
  mapStateToProps,
  { getEditCategory, updateCategory, fetchAdminCategories }
)(EditCategory);
