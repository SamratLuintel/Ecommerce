import React from "react";
import SingleInfoTab from "./SingleInfoTab/SingleInfoTab";

const AdditionalInfoTabs = props => {
  return (
    <div className="AdditionalInfoTabs">
      <SingleInfoTab
        name="details"
        selectedTab={props.selectedTab}
        onSelectedTabChange={props.onSelectedTabChange}
      />
      <SingleInfoTab
        name="reviews"
        selectedTab={props.selectedTab}
        onSelectedTabChange={props.onSelectedTabChange}
      />
      <SingleInfoTab
        name="add-review"
        selectedTab={props.selectedTab}
        onSelectedTabChange={props.onSelectedTabChange}
      />
    </div>
  );
};

export default AdditionalInfoTabs;
