import React from "react";
import Progress from "react-progressbar";

const VisitorsSales = () => {
  return (
    <div className="VisitorsSales">
      <div className="VisitorsSales__sales">
        <p className="VisitorsSales__sales__title">
          Today's
          <span className="VisitorsSales__sales__float-right VisitorSales__sales__float-right--green">
            <i class="fas fa-arrow-up" /> 6.89%
          </span>
        </p>
        <div className="VisitorsSales__progress-bar">
          <Progress completed={75} color="#28d094" />
        </div>
      </div>
      <div className="VisitorsSales__sales">
        <p className="VisitorsSales__sales__title">
          Yesterday's
          <span className="VisitorsSales__sales__float-right VisitorSales__sales__float-right--red">
            <i class="fas fa-arrow-down" /> 6.89%
          </span>
        </p>
        <div className="VisitorsSales__progress-bar">
          <Progress completed={75} color="#FF4961" />
        </div>
      </div>
    </div>
  );
};

export default VisitorsSales;
