import React, { Component } from "react";
import { fetchUser } from "../../store/actions/profile/profile";
import { connect } from "react-redux";
import ApplicationHeader from "../common/ApplicationHeader/ApplicationHeader";
import FeaturedProduct from "./FeaturedProduct/FeaturedProduct";
import HomeBanner from "./HomeBanner/HomeBanner";
import RandomProducts from "./RandomProducts/RandomProducts";

class Home extends Component {
  componentDidMount = () => {
    //FetchUser function is called initially at App.js
    //This page is usually called when the user logs in
    this.handleUserToken();
  };

  handleUserToken = () => {
    if (
      (this.props.profile.fetched && !this.props.profile.authenticated) ||
      !this.props.profile.fetched
    ) {
      console.log("from home is called");
      let token;
      if (this.props.match.params.token) {
        token = this.props.match.params.token;
        console.log("the token is", token);
      }
      this.props.fetchUser(token);
    }
  };

  render() {
    return (
      <div>
        <ApplicationHeader />
        {/*<FeaturedProduct />*/}
        <HomeBanner />
        <RandomProducts />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { fetchUser }
)(Home);
