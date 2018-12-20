import React from "react";
import Progress from "react-progressbar";

const EmailCard = () => {
  return (
    <div className="EmailCard">
      <div className="EmailCard__header">
        <h4 className="EmailCard__header__title">Email</h4>
      </div>
      <div className="EmailCard__content">
        <p className="EmailCard__label">
          Open rate
          <span className="EmailCard__label__right">89%</span>
        </p>
        <div className="EmailCard__progress-bar">
          <Progress color="#FF3D53" completed={75} />
        </div>
        <p className="EmailCard__label EmailCard__label__last">
          Sent
          <span className="EmailCard__label__right">310/500</span>
        </p>
        <div className="EmailCard__progress-bar">
          <Progress color="#26C787" completed={75} />
        </div>
      </div>
    </div>
  );
};

export default EmailCard;
