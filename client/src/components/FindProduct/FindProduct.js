import React, { Component } from "react";
import ApplicationHeader from "../common/ApplicationHeader/ApplicationHeader";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";
import {
  fetchProductBySearchText,
  resetSearchProducts
} from "../../store/actions/products/userProducts";
import ProductItemCard from "../common/Card/ProductItemCard/ProductItemCard";
import ApplicationSideNav from "../common/ApplicationSideNav/ApplicationSideNav";

class FindProduct extends Component {
  state = {
    searchedText: ""
  };

  componentDidMount = () => {
    this.setState({ searchedText: this.props.match.params.text });
    this.props.fetchProductBySearchText(this.props.match.params.text);
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.match.params.text !== prevState.searchedText) {
      console.log("Search text is changed");
      nextProps.resetSearchProducts();
      nextProps.fetchProductBySearchText(nextProps.match.params.text);
      return {
        searchedText: nextProps.match.params.text
      };
    }
  };

  renderProducts = () => {
    if (this.props.products.fetched && this.props.products.lists.length === 0) {
      return (
        <p className="FindProduct__error">
          Your searched did not match any result
        </p>
      );
    }

    return this.props.products.lists.map(product => {
      return (
        <div className="col-md-3 col-sm-6">
          <ProductItemCard
            title={product.title}
            images={product.images}
            price={product.price}
            id={product._id}
          />
        </div>
      );
    });
  };
  render() {
    let content = (
      <h1 className="FindProduct__header">
        You searched for "{this.state.searchedText}"
        <div className="row">{this.renderProducts()}</div>
      </h1>
    );

    if (!this.props.products.fetched) {
      content = (
        <div className="FindProduct__loader">
          <ClipLoader
            sizeUnit={"px"}
            size={53}
            color={"#00bcd1"}
            loading={true}
          />
        </div>
      );
    }
    return (
      <div className="FindProduct">
        <ApplicationSideNav />
        <ApplicationHeader />
        <div className="container">{content}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.searchedProducts
});

export default connect(
  mapStateToProps,
  { fetchProductBySearchText, resetSearchProducts }
)(FindProduct);
