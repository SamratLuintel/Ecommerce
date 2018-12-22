import React, { Component } from "react";

class AddProductImage extends Component {
  render() {
    const { props } = this;
    return (
      <div className="AddProductImage">
        <img
          src={props.image}
          alt="Product"
          className="AddProductImage__image"
        />
        <div
          className="AddProductImage__cross"
          onClick={() => props.onImageDelete(props.index)}
        >
          <i class="fas fa-times" />
        </div>
      </div>
    );
  }
}
export default AddProductImage;
