import React, { Component } from "react";

class EditProductImage extends Component {
  render() {
    const { props } = this;
    return (
      <div className="EditProductImage">
        <img src={props.image} alt="Product" />
        <div className="EditProductImage__cross" onClick={props.onImageDelete}>
          Cross
        </div>
      </div>
    );
  }
}
export default EditProductImage;
