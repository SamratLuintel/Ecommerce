import React from "react";

const HeaderTopPanel = () => {
  return (
    <div className="HeaderTopPanel">
      <div className="container">
        <div className="HeaderTopPanel__wrapper">
          <div className="HeaderTopPanel__left-section HeaderTopPanel__info">
            <span>
              <i class="fa fa-phone">&nbsp;</i>(+8400) 123 456 789
            </span>
            <span>
              <i class="far fa-envelope" />
              Email: hello@company.co
            </span>
          </div>
          <div className="HeaderTopPanel__right-section HeaderTopPanel__info">
            <span>
              <i class="far fa-user" />
              Account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopPanel;
