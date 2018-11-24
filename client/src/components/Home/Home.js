import React, { Component } from "react";
import { fetchUser } from "../../store/actions/profile/profile";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount = () => {
    let token;
    if (this.props.match.params.token) {
      token = this.props.match.params.token;
      console.log("the token is", token);
    }
    this.props.fetchUser(token);
  };

  render() {
    return <div>Home Route is called</div>;
  }
}
export default connect(
  null,
  { fetchUser }
)(Home);
