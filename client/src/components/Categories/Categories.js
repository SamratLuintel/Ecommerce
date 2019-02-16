import React, { Component } from "react";
import ApplicationHeader from "../common/ApplicationHeader/ApplicationHeader";
import InfiniteCategories from "./InfiniteCategories/InfiniteCategories";
import { connect } from "react-redux";
import { resetProductsOfCategories } from "../../store/actions/products/userProducts";
import { withRouter } from "react-router-dom";

class Categories extends Component {
  render() {
    let name = "";
    const categoriesLists = this.props.categories.lists;
    const categordId = this.props.match.params.id;
    //finding the name of category
    if (categoriesLists.length > 0) {
      for (let i = 0; i < categoriesLists.length; i++) {
        if (categoriesLists[i]._id === categordId) {
          name = categoriesLists[i].title;
        }
      }
    }
    return (
      <div className="Categories">
        <ApplicationHeader />
        <div className="container">
          <div className="Categories__header">{name}</div>
          <InfiniteCategories id={this.props.match.params.id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});
export default connect(
  mapStateToProps,
  { resetProductsOfCategories }
)(Categories);
