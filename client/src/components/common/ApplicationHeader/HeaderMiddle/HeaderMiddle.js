import React, { Component } from "react";
import HeaderControlBlock from "./HeaderControlBlock/HeaderControlBlock";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class HeaderMiddle extends Component {
  state = {
    searchedText: ""
  };

  redirectToHome = () => {
    this.props.history.push("/");
  };

  changeSearchedText = e => {
    this.setState({ searchedText: e.target.value });
  };

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.redirectToFindProduct();
    }
  };

  redirectToFindProduct = () => {
    this.props.history.push(`/findproduct/${this.state.searchedText}`);
  };

  totalItem = () => {
    if (this.props.carts.totalItems === 0) return 0;
    let total = 0;
    this.props.carts.items.map(item => {
      const itemTotalPrice = item.amount * item.product.price;
      total += itemTotalPrice;
    });
    return total;
  };
  render() {
    return (
      <div className="HeaderMiddle">
        <div className="container HeaderMiddle__content">
          <div className="HeaderMiddle__left">
            <h1 onClick={this.redirectToHome} className="HeaderMiddle__title">
              <span className="green">SAMRAT</span>MART
            </h1>
          </div>
          <div className="HeaderMiddle__right">
            <div className="HeaderMiddle__search-wrapper">
              <input
                type="text"
                className="HeaderMiddle__search"
                onKeyPress={this._handleKeyPress}
                onChange={this.changeSearchedText}
                value={this.state.searchedText}
                placeholder="Search Entire Store Here..."
              />
              <span className="HeaderMiddle__search-icon">
                <i class="fas fa-search" />
              </span>
            </div>
            {/*Control Block Area */}
            <HeaderControlBlock />
            <div className="HeaderMiddle__user-cart">
              Your Cart
              <p className="HeaderMiddle__user-cart__price">
                ${this.totalItem()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts
});

export default withRouter(connect(mapStateToProps)(HeaderMiddle));
