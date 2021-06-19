import React from "react";
import cx from 'classnames';

const date = new Date();

function Footer({mix}) {
  return (
    <footer className={cx(mix, 'footer')}>
      <p className="footer__copyright">© {date.getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
