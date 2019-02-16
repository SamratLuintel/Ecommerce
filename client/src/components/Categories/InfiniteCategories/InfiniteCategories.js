import React, { Component } from "react";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroller";
import {
  fetchProductsOfCategories,
  resetProductsOfCategories
} from "../../../store/actions/products/userProducts";
import ProductItemCard from "../../common/Card/ProductItemCard/ProductItemCard";

class InfiniteCategories extends Component {
  state = {
    //start index of the post
    skip: 0,
    //how many to fetch at a particular request
    limit: 4,
    currentId: "",
    fetching: false,
    scrollable: true
  };
  componentDidMount = () => {
    this.setState({ currentId: this.props.id });
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.id !== prevState.currentId) {
      console.log("Product id is changed");
      nextProps.resetProductsOfCategories();
      return {
        fetching: false,
        scrollable: true,
        currentId: nextProps.id,
        skip: 0
      };
    }
  };
  loadMoreProducts = async () => {
    if (!this.state.fetching) {
      this.setState({ fetching: true });
      await this.props.fetchProductsOfCategories(
        this.props.id,
        this.state.skip,
        this.state.limit
      );
      this.setState(prevState => {
        return { skip: prevState.skip + prevState.limit, fetching: false };
      });
    }
  };

  renderProducts = () => {
    if (
      !this.props.products.scrollable &&
      this.props.products.lists.length === 0
    ) {
      return <p>There are no products to show under this category</p>;
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
    return (
      <div className="InfiniteCategories">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMoreProducts}
          hasMore={this.props.products.scrollable}
          loader={
            <div className="InfiniteCategories__loading" key={0}>
              <ClipLoader
                sizeUnit={"px"}
                size={23}
                color={"#00bcd1"}
                loading={true}
              />
            </div>
          }
        >
          <div className="row">{this.renderProducts()}</div>
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.categories
});

export default connect(
  mapStateToProps,
  { fetchProductsOfCategories, resetProductsOfCategories }
)(InfiniteCategories);
