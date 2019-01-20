import React, { Component } from "react";

class EditProductImage extends Component {
  render() {
    const { props } = this;
    return (
      <div className="EditProductImage">
        <img
          src={props.image}
          alt="Product"
          className="EditProductImage__image"
        />
        <div
          className="EditProductImage__cross"
          onClick={() => props.onImageDelete(props.index)}
        >
          <i class="fas fa-times" />
        </div>
      </div>
    );
  }
}
export default EditProductImage;
