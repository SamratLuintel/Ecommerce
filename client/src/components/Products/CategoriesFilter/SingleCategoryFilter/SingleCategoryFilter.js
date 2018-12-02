import React, { Component } from "react";
import { setPublicProductCategoryFilter } from "../../../../store/actions/public/publicProducts/publicProducts";
import { connect } from "react-redux";

class SingleCategoryFilter extends Component {
  setFilter = () => {
    const id = this.props.id;
    this.props.setPublicProductCategoryFilter(id);
  };
  render() {
    const { props } = this;
    return (
      <div onClick={this.setFilter} className="SingleCategoryFilter">
        <p className="SingleCategoryFilter__text">{props.name}</p>
      </div>
    );
  }
}
export default connect(
  null,
  { setPublicProductCategoryFilter }
)(SingleCategoryFilter);
