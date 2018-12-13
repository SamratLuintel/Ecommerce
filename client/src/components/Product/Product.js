import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addProductToCart, fetchCart } from "../../store/actions/carts/carts";
import ApplicationHeader from "../common/ApplicationHeader/ApplicationHeader";
import ProductContext from "./productContext";
import ProductGallery from "./ProductGallery/ProductGallery";
import ProductShortDescription from "./ProductShortDescription/ProductShortDescription";
import ProductAdditionalInfo from "./ProductAdditionalInfo/ProductAdditionalInfo";

class Product extends Component {
  state = {
    fetched: false,
    //This variable keeps the track of whether the user has reviewd the product
    hasReviewed: null,
    //At first, we have to wait till the user profile is fetched and all other important things
    //are fetched. We will call hasReviewd checking function on CDU. so to prevent infinite
    //loop we will use this variable
    hasReviewedCall: false,
    id: "",
    title: "",
    desc: "",
    price: "",
    images: [],
    details: "",
    reviews: [],
    //product info
    amount: 10,
    //Three options
    //details , reviews and add-review
    selectedTab: "details"
  };

  componentDidMount = () => {
    this.fetchProduct();
  };

  fetchProduct = async () => {
    try {
      const id = this.props.match.params.id;
      const res = await axios.get(`/api/product/${id}`);

      console.log("From fetch product", res.data);

      this.setState({
        title: res.data.title,
        desc: res.data.desc,
        price: res.data.price,
        images: res.data.images,
        details: res.data.details,
        id: res.data._id,
        reviews: res.data.reviews,
        fetched: true
      });

      if (this.props.profile.authenticated)
        this.setState({
          hasReviewed: this.hasAlreadyReviewed(res.data.reviews)
        });
    } catch (error) {
      console.log(error.response);
      //If the server has send some error message display them
      if (error.response.data.message) {
        return this.setState({
          errorMessage: error.response.data.message,
          error: true,
          fetched: true
        });
      }

      this.setState({
        errorMessage: "Ooops some error has occured.Please try again later",
        error: true,
        fetched: true
      });
    }
  };
  onSelectedTabChange = name => {
    this.setState({ selectedTab: name });
  };
  componentDidUpdate = (prevProps, prevState) => {
    //Updates the hasReviewed property
    //If it is true the user can't add a new review to the product
    if (
      this.props.profile.fetched &&
      this.props.profile.authenticated &&
      !prevState.hasReviewedCall
    ) {
      const hasReviewed = this.hasAlreadyReviewed(prevState.reviews);
      this.setState({
        hasReviewed,
        hasReviewedCall: true
      });
    }
  };

  hasAlreadyReviewed = reviews => {
    const filteredReviews = reviews.filter(
      review => review.createdBy._id === this.props.profile.id
    );

    if (filteredReviews.length === 0) {
      return false;
    }

    return true;
  };
  onAddProductToCart = async () => {
    const product = this.props.match.params.id;
    const amount = this.state.amount;
    const data = { product, amount };
    await this.props.addProductToCart(data);
    console.log("Add Product to card finished");
    this.props.fetchCart();
  };
  render() {
    if (this.state.error && this.state.fetched)
      return <p>{this.state.errorMessage}</p>;

    const contextValue = {
      title: this.state.title,
      desc: this.state.desc,
      price: this.state.price,
      images: this.state.images,
      amount: this.state.amount,
      details: this.state.details,
      id: this.state.id,
      reviews: this.state.reviews,
      hasReviewed: this.state.hasReviewed,
      onAddProductToCart: this.onAddProductToCart,
      selectedTab: this.state.selectedTab,
      onSelectedTabChange: this.onSelectedTabChange,
      fetchProduct: this.fetchProduct
    };
    return (
      <ProductContext.Provider value={contextValue}>
        <div className="Product">
          <ApplicationHeader />
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">{/*<ProductGallery />*/}</div>
              <div className="col-md-6 col-sm-12">
                <ProductShortDescription />
              </div>
            </div>
            <ProductAdditionalInfo />
          </div>
        </div>
      </ProductContext.Provider>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { addProductToCart, fetchCart }
)(Product);
