import React from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {
  return (
    <nav className='nav nav--user'>
      <Link className='nav__el' to='/login'>
        Log in
      </Link>
      <Link className='nav__el nav__el--cta' to='/signup'>
        Sign up
      </Link>
    </nav>
  );
};

export default Logout;
