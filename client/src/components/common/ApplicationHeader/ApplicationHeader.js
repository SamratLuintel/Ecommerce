import React, { Component } from "react";
import { connect } from "react-redux";

class ApplicationHeader extends Component {
  render() {
    const { props } = this;
    return (
      <div className="ApplicationHeader">
        <i class="fas fa-shopping-cart" />
        {props.carts.totalItems}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts
});
export default connect(mapStateToProps)(ApplicationHeader);
