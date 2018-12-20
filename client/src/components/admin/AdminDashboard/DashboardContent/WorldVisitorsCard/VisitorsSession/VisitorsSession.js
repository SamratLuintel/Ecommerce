import React from "react";
import VisitorsDoughnut from "./VisitorsDoughnut/VisitorsDoughnut";
import VisitorsSales from "./VisitorsSales/VisitorsSales";

const VisitorsSession = () => {
  return (
    <div className="VisitorsSession">
      <h4 className="VisitorsSession__title">Visitors Session</h4>
      <div className="row">
        <div className="col-12">
          <p className="VisitorsSession__label-text">Sessions by Browser</p>
        </div>
        <div className="col-12">
          <VisitorsDoughnut />
        </div>
        <div className="col-12">
          <VisitorsSales />
        </div>
      </div>
    </div>
  );
};
export default VisitorsSession;
