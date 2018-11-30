import React, { Component } from "react";

class AddProductImage extends Component {
  render() {
    const { props } = this;
    return (
      <div className="AddProductImage">
        <img src={props.image} alt="Product" />
        <div
          className="AddProductImage__cross"
          onClick={() => props.onImageDelete(props.index)}
        >
          Cross
        </div>
      </div>
    );
  }
}
export default AddProductImage;
