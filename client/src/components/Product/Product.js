import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addProductToCart, fetchCart } from "../../store/actions/carts/carts";
import ApplicationHeader from "../common/ApplicationHeader/ApplicationHeader";
import AddProductContext from "./addProductContext";
import ProductGallery from "./ProductGallery/ProductGallery";
import ProductShortDescription from "./ProductShortDescription/ProductShortDescription";
import ProductAdditionalInfo from "./ProductAdditionalInfo/ProductAdditionalInfo";

class Product extends Component {
  state = {
    fetched: false,
    id: "",
    title: "",
    desc: "",
    price: "",
    images: [],
    details: "",
    //product info
    amount: 10
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
        fetched: true
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
      onAddProductToCart: this.onAddProductToCart
    };
    return (
      <AddProductContext.Provider value={contextValue}>
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
      </AddProductContext.Provider>
    );
  }
}
export default connect(
  null,
  { addProductToCart, fetchCart }
)(Product);
