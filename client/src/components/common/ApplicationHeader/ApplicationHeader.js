import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderTopPanel from "./HeaderTopPanel/HeaderTopPanel";
import HeaderMiddle from "./HeaderMiddle/HeaderMiddle";
import HeaderNavbar from "./HeaderNavbar/HeaderNavbar";
import { fetchCategories } from "../../../store/actions/categories/userCategories";
import ApplicationHeaderContext from "./applicationHeaderContext";
import LogInModal from "./LogInModal/LogInModal";
import SignUpModal from "./SignUpModal/SignUpModal";

class ApplicationHeader extends Component {
  state = {
    loginModalOpen: false,
    signupModalOpen: true
  };
  componentDidMount = () => {
    this.props.fetchCategories();
  };

  closeLoginModal = () => {
    this.setState({ loginModalOpen: false });
  };

  openLoginModal = () => {
    this.setState({ loginModalOpen: true });
  };

  openSignUpModal = () => {
    console.log("Open Sign Up Modal is called");
    this.setState({ signupModalOpen: true });
  };

  closeSignUpModal = () => {
    this.setState({ signupModalOpen: false });
  };
  render() {
    const { props } = this;
    const contextValue = {
      loginModalOpen: this.state.loginModalOpen,
      signupModalOpen: this.state.signupModalOpen,
      closeLoginModal: this.closeLoginModal,
      openLoginModal: this.openLoginModal,
      openSignUpModal: this.openSignUpModal,
      closeSignUpModal: this.closeSignUpModal
    };
    return (
      <ApplicationHeaderContext.Provider value={contextValue}>
        <div className="ApplicationHeader">
          <HeaderTopPanel />
          <HeaderMiddle />
          <HeaderNavbar />
          <LogInModal />
          <SignUpModal />
        </div>
      </ApplicationHeaderContext.Provider>
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
