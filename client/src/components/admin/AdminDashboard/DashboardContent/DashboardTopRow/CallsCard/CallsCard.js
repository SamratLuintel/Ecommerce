import React, { Component } from "react";

class CallsCard extends Component {
  render() {
    return (
      <div className="CallsCard">
        <div className="CallsCard__left">
          <h6 className="CallsCard__left__title">Calls</h6>
          <h3 className="CallsCard__left__subtitle">3,568</h3>
        </div>
        <div className="CallsCard__right">
          <i class="fas fa-phone" />
        </div>
      </div>
    );
  }
}
export default CallsCard;
