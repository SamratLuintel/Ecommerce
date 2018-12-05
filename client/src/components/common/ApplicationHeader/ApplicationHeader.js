import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderTopPanel from "./HeaderTopPanel/HeaderTopPanel";
import HeaderMiddle from "./HeaderMiddle/HeaderMiddle";
import HeaderNavbar from "./HeaderNavbar/HeaderNavbar";
import { fetchCategories } from "../../../store/actions/categories/userCategories";

class ApplicationHeader extends Component {
  componentDidMount = () => {
    this.props.fetchCategories();
  };
  render() {
    const { props } = this;
    return (
      <div className="ApplicationHeader">
        <HeaderTopPanel />
        <HeaderMiddle />
        <HeaderNavbar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts
});
export default connect(
  mapStateToProps,
  { fetchCategories }
)(ApplicationHeader);
