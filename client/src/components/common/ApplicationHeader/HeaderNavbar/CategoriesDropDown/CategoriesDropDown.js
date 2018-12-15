import React, { Component } from "react";
import FadeIn from "react-fade-in";
import { connect } from "react-redux";

class CategoriesDropDown extends Component {
  state = {
    showMenu: false,
    fetched: false
  };

  showMenu = event => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    //For fixing the fading in animation bug
    if (this.props.categories.fetched && !prevState.fetched) {
      this.setState({ fetched: true });
    }
  };

  renderCategoriesList = () => {
    if (!this.props.categories.fetched) return;

    return this.props.categories.lists.map(category => (
      <div className="CategoriesDropDown__menu-item">
        <i className={category.icon} />
        <span> {category.title}</span>
      </div>
    ));
  };
  render() {
    return (
      <div className="CategoriesDropDown">
        <div className="CategoriesDropDown__button" onClick={this.showMenu}>
          <i class="fas fa-bars" />
          Categories
          <i class="fas fa-chevron-down" />
        </div>

        {this.state.showMenu && this.state.fetched ? (
          <div className="CategoriesDropDown__menu-lists">
            <FadeIn>{this.renderCategoriesList()}</FadeIn>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});
export default connect(mapStateToProps)(CategoriesDropDown);
