import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AiOutlineSetting, AiOutlineStar, AiOutlineCreditCard } from 'react-icons/ai';
import { RiBriefcase3Line } from 'react-icons/ri';
import { FormRow, ProfileSetting } from '../components';
import { useAppContext } from '../contexts/appContext';

const Profile = () => {
  const location = useLocation();

  return (
    <div className='user-view'>
      <nav className='user-view__menu'>
        <ul className='side-nav'>
          <li className={location.pathname === '/me' ? 'side-nav--active' : ''}>
            <NavLink to='/me'>
              <AiOutlineSetting />
              Settings
            </NavLink>
          </li>
          <li className={location.pathname === '/me/my-tours' ? 'side-nav--active' : ''}>
            <NavLink to='my-tours'>
              <RiBriefcase3Line />
              My bookings
            </NavLink>
          </li>
          <li className={location.pathname === '/me/reviews' ? 'side-nav--active' : ''}>
            <NavLink to='reviews'>
              <AiOutlineStar />
              My reviews
            </NavLink>
          </li>
          <li className={location.pathname === '/me/billing' ? 'side-nav--active' : ''}>
            <NavLink to='billing'>
              <AiOutlineCreditCard />
              Billing
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className='user-view__content'>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
