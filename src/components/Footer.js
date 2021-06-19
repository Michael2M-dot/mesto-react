import React from "react";
import cx from 'classnames';

function Footer({mix}) {
  return (
    <footer className={cx(mix, 'footer')}>
      <p className="footer__copyright">© 2020 Mesto Russia</p>
    </footer>
  );
}

export default Footer;
