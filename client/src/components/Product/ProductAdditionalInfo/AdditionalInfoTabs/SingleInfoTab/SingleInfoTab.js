import React, { Component } from "react";
import classnames from "classnames";

const SingleInfoTab = props => {
  const tabClasses = classnames({
    SingleInfoTab: true,
    "SingleInfoTab--selected": props.name === props.selectedTab
  });
  return (
    <div
      className={tabClasses}
      onClick={() => props.onSelectedTabChange(props.name)}
    >
      {props.name}
    </div>
  );
};

export default SingleInfoTab;
