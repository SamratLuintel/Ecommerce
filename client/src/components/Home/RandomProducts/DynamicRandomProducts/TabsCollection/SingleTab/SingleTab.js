import React, { Component } from "react";
import classnames from "classnames";
class SingleTab extends Component {
  render() {
    const { props } = this;
    const tabClasses = classnames({
      SingleTab: true,
      "SingleTab--selected": props.selected
    });
    return (
      <div className={tabClasses} onClick={props.onChangeTab}>
        {props.name}
      </div>
    );
  }
}
export default SingleTab;
