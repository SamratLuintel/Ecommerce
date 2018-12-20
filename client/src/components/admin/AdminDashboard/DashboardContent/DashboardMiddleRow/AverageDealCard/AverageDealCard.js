import React from "react";

const AverageDealCard = () => {
  return (
    <div className="AverageDealCard">
      <div className="AverageDealCard__header">Average Deal Size</div>
      <div className="AverageDealCard__body">
        <div className="row">
          <div className="col-md-6 AverageDealCard__col">
            <h6 className="AverageDealCard__body__percentage AverageDealCard__color--red">
              -30%
            </h6>
            <h4 className="AverageDealCard__body__title">$12,536</h4>
            <p className="AverageDealCard__body__subtitle">Per rep</p>
          </div>
          <div className="col-md-6 AverageDealCard__col">
            <h6 className="AverageDealCard__body__percentage AverageDealCard__color--green">
              -30%
            </h6>
            <h4 className="AverageDealCard__body__title">$12,536</h4>
            <p className="AverageDealCard__body__subtitle">Per rep</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverageDealCard;
