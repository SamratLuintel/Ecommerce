import React, { Component } from "react";
import { connect } from "react-redux";
import PaypalExpressBtn from "react-paypal-express-checkout";
import ApplicationHeader from "../common/ApplicationHeader/ApplicationHeader";
import CheckoutCart from "./CheckoutCart/CheckoutCart";

class Checkout extends Component {
  // renderCartItems = () => {
  //   return this.props.carts.items.map(item => {
  //     const amount = item.amount;
  //     const { title, desc, price } = item.product;
  //     return (
  //       <CheckoutItem title={title} desc={desc} price={price} amount={amount} />
  //     );
  //   });
  // };
  render() {
    const client = {
      sandbox:
        "AV_YtqaEw-JSXf7VfV0oKruh-qZsfsm7zR_GrEKMFBzIJUHRWA03BlFdCdzlySDiQpfGco17ZhDVLvEl",
      production:
        "AV_YtqaEw-JSXf7VfV0oKruh-qZsfsm7zR_GrEKMFBzIJUHRWA03BlFdCdzlySDiQpfGco17ZhDVLvEl"
    };
    return (
      <div className="Checkout">
        <ApplicationHeader />
        <div className="container">
          <h1 className="Checkout__heading">Shopping Cart</h1>
          <div className="row">
            <div className="col-md-8">
              <CheckoutCart />
            </div>
          </div>

          {/*<PaypalExpressBtn client={client} currency={"USD"} total={1.0} />*/}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts
});
export default connect(mapStateToProps)(Checkout);
