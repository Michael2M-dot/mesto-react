import mestoLogo from "../images/mesto_logo.svg";
import cx from "classnames";
import React from "react";

function Header({ mix }) {
  return (
    <header className={cx(mix, "header")}>
      <a href="/" className="logo" target="_self">
        <img src={mestoLogo} alt="Логотип MESTO" className="header__logo" />
      </a>
    </header>
  );
}

export default Header;
