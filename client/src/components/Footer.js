import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__logo'>
        <img src='../images/logo-green.png' alt='Natour logo' />
      </div>
      <ul className='footer__nav'>
        <li>
          <Link to='#'>About us</Link>
        </li>
        <li>
          <Link to='#'>Download apps</Link>
        </li>
        <li>
          <Link to='#'>Become a guide</Link>
        </li>
        <li>
          <Link to='#'>Careers</Link>
        </li>
        <li>
          <Link to='#'>Contact</Link>
        </li>
      </ul>
      <p className='footer__copyright'>© 2022 by Jonas Schmedtmann.</p>
    </footer>
  );
};

export default Footer;
