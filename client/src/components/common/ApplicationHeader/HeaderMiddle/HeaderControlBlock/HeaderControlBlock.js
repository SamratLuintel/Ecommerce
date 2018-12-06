import React, { Component } from "react";
import { connect } from "react-redux";

class HeaderControlBlock extends Component {
  render() {
    const { props } = this;
    return (
      <div className="HeaderControlBlock">
        <div className="HeaderControlBlock__action-btn">
          <i class="fas fa-shopping-cart" />
          <span className="HeaderControlBlock__action-btn__counter">
            {props.carts.totalItems}
          </span>
        </div>
        <div className="HeaderControlBlock__action-btn">
          <i class="fas fa-user" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  carts: state.carts
});
export default connect(mapStateToProps)(HeaderControlBlock);