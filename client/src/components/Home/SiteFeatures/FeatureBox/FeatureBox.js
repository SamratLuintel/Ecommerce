import React from "react";

const FeatureBox = props => {
  return (
    <div className="FeatureBox">
      <div className="FeatureBox__icon">{props.icon}</div>
      <div className="FeatureBox__info">
        <h4>{props.title}</h4>
        <p>{props.subtitle}</p>
      </div>
    </div>
  );
};
export default FeatureBox;
