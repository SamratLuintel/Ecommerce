import React from "react";
import { withRouter } from "react-router-dom";

const AdminProductsHeader = props => {
  const redirectToCreateProduct = () => {
    props.history.push("/admin/add-product");
  };

  return (
    <div className="AdminProductsHeader">
      <div className="AdminProductsHeader__content">
        <h3 className="AdminProductsHeader__content__title">
          Order
          <span
            onClick={redirectToCreateProduct}
            className="AdminProductHeader__content__create-product-btn"
          >
            Create Product
          </span>
        </h3>
        <p className="AdminProductsHeader__content__alternate-title">
          Home - Products
        </p>
      </div>
    </div>
  );
};

export default withRouter(AdminProductsHeader);
