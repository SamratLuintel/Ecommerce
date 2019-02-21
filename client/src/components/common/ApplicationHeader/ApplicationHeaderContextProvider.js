import React, { Component } from "react";
import ApplicationHeaderContext from "./applicationHeaderContext";

class ApplicationHeaderContextProvider extends Component {
  state = {
    loginModalOpen: false,
    signupModalOpen: false
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
        {this.props.children}
      </ApplicationHeaderContext.Provider>
    );
  }
}
export default ApplicationHeaderContextProvider;
