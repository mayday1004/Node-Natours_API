import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/appContext';

const Login = () => {
  const { user, logoutUser } = useAppContext();
  return (
    <nav className='nav nav--user'>
      <Link className='nav__el nav__el--logout' onClick={() => logoutUser()}>
        Log out
      </Link>
      <Link className='nav__el' to='/me'>
        <img className='nav__user-img' src={`images/users/${user.photo}`} alt={user.name} />
        <span>{user.name}</span>
      </Link>
    </nav>
  );
};

export default Login;
