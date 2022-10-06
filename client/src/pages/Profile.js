import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AiOutlineSetting, AiOutlineStar, AiOutlineCreditCard } from 'react-icons/ai';
import { RiBriefcase3Line } from 'react-icons/ri';
import { FormRow, ProfileSetting } from '../components';
import { useAppContext } from '../contexts/appContext';

const Profile = () => {
  return (
    <div className='user-view'>
      <nav className='user-view__menu'>
        <ul className='side-nav'>
          <li className='side-nav--active'>
            <Link to='/me'>
              <AiOutlineSetting />
              Settings
            </Link>
          </li>
          <li>
            <Link to='my-tours'>
              <RiBriefcase3Line />
              My bookings
            </Link>
          </li>
          <li>
            <Link to='reviews'>
              <AiOutlineStar />
              My reviews
            </Link>
          </li>
          <li>
            <Link to='#'>
              <AiOutlineCreditCard />
              Billing
            </Link>
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
