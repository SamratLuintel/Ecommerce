import React, { Component } from "react";
import axios from "axios";

class Product extends Component {
  state = {
    fetched: false,
    title: "",
    desc: "",
    price: "",
    images: []
  };

  componentDidMount = () => {
    this.fetchProduct();
  };

  fetchProduct = async () => {
    try {
      const id = this.props.match.params.id;
      const res = await axios.get(`/api/product/${id}`);

      this.setState({
        title: res.data.title,
        desc: res.data.desc,
        price: res.data.price,
        images: res.data.images,
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

  render() {
    if (this.state.error && this.state.fetched)
      return <p>{this.state.errorMessage}</p>;
    return (
      <div className="Product">
        <p>{this.state.title}</p>
        <p>{this.state.desc}</p>
        <p>{this.state.price}</p>
      </div>
    );
  }
}
export default Product;
