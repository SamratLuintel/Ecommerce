import React, { Component } from "react";
import {
  addCategory,
  fetchAdminCategories
} from "../../../store/actions/categories/adminCategories";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { connect } from "react-redux";
import AdminHeader from "../../common/admin/AdminHeader/AdminHeader";
import AdminSideNav from "../../common/admin/AdminSideNav/AdminSideNav";
import classnames from "classnames";

class AddCategory extends Component {
  state = {
    title: "",
    icon: "fas fa-calendar-alt",
    titleErr: "",
    nav: "add-category",
    saving: false
  };

  onTitleChange = e => this.setState({ title: e.target.value, titleErr: "" });

  resetCategoryState = () => {
    this.setState({
      title: "",
      icon: "fas fa-calendar-alt",
      titleErr: "",
      nav: "add-category"
    });
  };
  setFormError = error => {
    if (error.title) this.setState({ titleError: error.title });
  };

  onIconChange = e => {
    this.setState({ icon: e.target.value });
  };

  onTitleChange = e => {
    this.setState({ title: e.target.value, titleError: "" });
  };

  onFormSubmit = async () => {
    const title = this.state.title;
    const icon = this.state.icon;
    this.setState({ saving: true });
    try {
      await this.props.addCategory(title, icon);
      this.setState({ saving: false });
      NotificationManager.info("Category have been successfully created");
      this.resetCategoryState();
      this.props.fetchAdminCategories();
    } catch (error) {
      console.log("Add Category", error);
      this.setFormError(error);
    }
  };

  setFormError = error => {
    if (error.title) {
      this.setState({ titleErr: error.title });
    }
  };
  render() {
    return (
      <div className="AddCategory">
        <AdminSideNav nav={this.state.nav} />
        {/* Margin left of 260px */}
        <div className="AddCategory__main-area admin-default-left-margin-mid">
          <AdminHeader />
          <div className="AddCategory__main-area__wrapper">
            <div className="AddCategory__main-area__content">
              <h2 className="AddCategory__main-area__header">Add Category</h2>
              <div className="AddCategory__main-area__icon-demo">
                <span>Icon: </span> <i className={this.state.icon} />
              </div>
              <div className="AddCategory__single-field AddCategory__single-field--no-bottom-margin">
                <h3 className="AddCategory__single-field__title">
                  Select Icon:
                </h3>
                <input
                  type="text"
                  className="AddCategory__single-field__input"
                  placeholder="Put classname of font-awesome icon"
                  value={this.state.icon}
                  onChange={this.onIconChange}
                />
              </div>
              <div className="AddCategory__short-info">
                Note:You must use just the classname of font-awesome icon. Visit{" "}
                <a
                  href="https://fontawesome.com/"
                  className="AddCategory__short-info__link"
                  target="_blank"
                >
                  https://fontawesome.com/
                </a>
              </div>
              <div className="AddCategory__single-field">
                <h3 className="AddCategory__single-field__title">Title:</h3>
                <input
                  type="text"
                  className={classnames({
                    "AddCategory__single-field__input": true,
                    "AddCategory__single-field__input--error": this.state
                      .titleErr
                  })}
                  placeholder="Provide the name of the category"
                  value={this.state.title}
                  onChange={this.onTitleChange}
                />
                {this.state.titleErr && (
                  <p className="AddCategory__single-field__error">
                    {this.state.titleErr}
                  </p>
                )}
              </div>

              <p />
              <button
                onClick={this.onFormSubmit}
                className="AddCategory__create-btn"
              >
                Create
              </button>
            </div>
          </div>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { addCategory, fetchAdminCategories }
)(AddCategory);
