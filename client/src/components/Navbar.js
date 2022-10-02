import React from 'react';
import { Link } from 'react-router-dom';

import logoWhite from '../assets/images/logo-white.png';

const Navbar = () => {
  return (
    <header className='header'>
      <nav className='nav nav--tours'>
        <Link to='/' className='nav__el'>
          All tours
        </Link>
      </nav>
      <div className='header__logo'>
        <img src={logoWhite} alt='Natours logo' />
      </div>
      <nav className='nav nav--user'>
        <Link className='nav__el' to='/login'>
          Log in
        </Link>
        <Link className='nav__el nav__el--cta' to='/signup'>
          Sign up
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
