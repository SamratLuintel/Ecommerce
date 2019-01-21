import React from "react";

export default React.createContext({
  isSideNavOpen: false,
  openSideNav: () => {},
  closeSideNav: () => {}
});
