import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPublicCategories } from "../../../store/actions/public/publicCategories/publicCategories";
import SingleCategoryFilter from "./SingleCategoryFilter/SingleCategoryFilter";

class CategoriesFilter extends Component {
  componentDidMount = () => {
    if (!this.props.publicCategories.fetched) {
      this.props.fetchPublicCategories();
    }
  };

  renderCategoryOptions = () => {
    if (!this.props.publicCategories.fetched) return;

    return this.props.publicCategories.lists.map(category => (
      <SingleCategoryFilter id={category._id} name={category.title} />
    ));
  };
  render() {
    return (
      <div className="CategoriesFilter">{this.renderCategoryOptions()}</div>
    );
  }
}

const mapStateToProps = state => ({
  publicCategories: state.publicCategories
});
export default connect(
  mapStateToProps,
  { fetchPublicCategories }
)(CategoriesFilter);
