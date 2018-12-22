import React from "react";

const AdminProductsHeader = props => {
  return (
    <div className="AdminProductsHeader">
      <div className="AdminProductsHeader__content">
        <h3 className="AdminProductsHeader__content__title">
          Order
          <span className="AdminProductHeader__content__create-product-btn">
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

export default AdminProductsHeader;
