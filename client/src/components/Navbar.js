import React from 'react';
import { Link } from 'react-router-dom';
import { Login, Logout } from './index';

import { useAppContext } from '../contexts/appContext';

const Navbar = () => {
  const { user } = useAppContext();
  return (
    <header className='header'>
      <nav className='nav nav--tours'>
        <Link to='/' className='nav__el'>
          All tours
        </Link>
      </nav>
      <div className='header__logo'>
        <img src='images/logo-white.png' alt='Natours logo' />
      </div>
      {user ? <Login /> : <Logout />}
    </header>
  );
};

export default Navbar;
