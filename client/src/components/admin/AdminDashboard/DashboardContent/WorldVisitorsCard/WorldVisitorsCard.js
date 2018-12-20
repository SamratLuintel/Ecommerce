import React, { Component } from "react";
import { VectorMap } from "react-jvectormap";
import VisitorsSession from "./VisitorsSession/VisitorsSession";

const regionStyle = {
  initial: { fill: "rgb(255, 117, 136)" },
  hover: { fill: "rgb(254, 187, 196)" }
};

class WorldVisitorsCard extends Component {
  render() {
    return (
      <div className="WorldVisitorsCard">
        <div className="row">
          <div className="col-md-9">
            <VectorMap
              map={"world_mill"}
              backgroundColor="#fff"
              ref="map"
              containerStyle={{
                width: "100%",
                height: "450px"
              }}
              regionStyle={regionStyle}
              containerClassName="map"
            />
          </div>
          <div className="col-md-3">
            <VisitorsSession />
          </div>
        </div>
      </div>
    );
  }
}
export default WorldVisitorsCard;
