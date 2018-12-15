import React, { Component } from "react";
import { connect } from "react-redux";
import PaypalExpressBtn from "react-paypal-express-checkout";

class CartSummary extends Component {
  state = {
    shipping: 25
  };
  checkoutBtn = React.createRef();

  subTotal = () => {
    if (this.props.carts.totalItems === 0) return 0;
    let total = 0;
    this.props.carts.items.map(item => {
      const itemTotalPrice = item.amount * item.product.price;
      total += itemTotalPrice;
    });
    return total;
  };

  orderTotal = () => this.state.shipping + this.subTotal();

  onCheckoutClick = () => {
    console.log(this.checkoutBtn);
  };
  render() {
    const client = {
      sandbox:
        "AV_YtqaEw-JSXf7VfV0oKruh-qZsfsm7zR_GrEKMFBzIJUHRWA03BlFdCdzlySDiQpfGco17ZhDVLvEl",
      production:
        "AV_YtqaEw-JSXf7VfV0oKruh-qZsfsm7zR_GrEKMFBzIJUHRWA03BlFdCdzlySDiQpfGco17ZhDVLvEl"
    };
    return (
      <div className="CartSummary">
        <div className="CartSummary__title">Summary</div>
        <div className="CartSummary__block-summary">
          <div>Estimate Shipping and Taxx</div>
          <div>$0.00</div>
        </div>
        <div className="CartSummary__block-summary">
          <div>SubTotal</div>
          <div>${this.subTotal()}</div>
        </div>
        <div className="CartSummary__block-summary">
          <div>Shipping(Flat rate - Fixed)</div>
          <div>${this.state.shipping}</div>
        </div>
        <div className="CartSummary__block-summary">
          <div>OrderTotal</div>
          <div>${this.orderTotal()}</div>
        </div>
        <div
          onClick={this.onCheckoutClick}
          className="CartSummary__checkout-btn"
        >
          <PaypalExpressBtn
            ref={this.checkoutBtn}
            client={client}
            currency={"USD"}
            total={this.orderTotal()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts
});
export default connect(mapStateToProps)(CartSummary);
