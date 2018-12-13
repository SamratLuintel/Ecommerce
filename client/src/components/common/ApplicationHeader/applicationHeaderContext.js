import React from "react";

export default React.createContext({
  loginModalOpen: false,
  signupModalOpen: false,
  closeLoginModal: () => {},
  openLoginModal: () => {},
  openSignUpModal: () => {},
  closeSignUpModal: () => {}
});
