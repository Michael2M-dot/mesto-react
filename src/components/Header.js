import mestoLogo from "../images/mesto_logo.svg";
import React from "react";

function Header() {
  return (
    <header className="header page__header section">
      <a href="#" className="logo" target="_self">
        <img src={mestoLogo} alt="Логотип MESTO" className="header__logo" />
      </a>
    </header>
  );
}

export default Header;
