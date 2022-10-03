import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSetting, AiOutlineStar, AiOutlineCreditCard } from 'react-icons/ai';
import { RiBriefcase3Line } from 'react-icons/ri';
import { FormRow } from '../components';
import { useAppContext } from '../contexts/appContext';

const Profile = () => {
  const { user } = useAppContext();
  return (
    <div className='user-view'>
      <nav className='user-view__menu'>
        <ul className='side-nav'>
          <li className='side-nav--active'>
            <Link to='#'>
              <AiOutlineSetting />
              Settings
            </Link>
          </li>
          <li>
            <Link to='/my-tours'>
              <RiBriefcase3Line />
              My bookings
            </Link>
          </li>
          <li>
            <Link to='#'>
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
        <div className='user-view__form-container'>
          <h2 className='heading-secondary ma-bt-md'>Your account settings</h2>
          <form className='form form-user-data'>
            <FormRow name='name' type='text' required='required' text='Your name' />
            <FormRow
              className='ma-bt-md'
              name='email'
              type='email'
              placeholder='you@example.io'
              text='Email address'
            />
            <div className='form__group form__photo-upload'>
              <img className='form__user-photo' src={`images/users/${user.photo}`} alt='User' />
              <input className='form__upload' type='file' accept='image/*' id='photo' name='photo' />
              <label htmlFor='photo'>Choose new photo</label>
            </div>
            <div className='form__group right'>
              <button className='btn btn--small btn--green'>Save settings</button>
            </div>
          </form>
        </div>
        <div className='line'>&nbsp;</div>
        <div className='user-view__form-container'>
          <h2 className='heading-secondary ma-bt-md'>Password change</h2>
          <form className='form form-user-password'>
            <FormRow
              name='password-current'
              type='password'
              placeholder='••••••••'
              text='Current password'
              minlength='8'
            />
            <FormRow
              name='password'
              type='password'
              placeholder='••••••••'
              text='New password'
              minlength='8'
            />
            <FormRow
              className='ma-bt-lg'
              name='password-confirm'
              type='password'
              placeholder='••••••••'
              text='Confirm password'
              minlength='8'
            />
            <div className='form__group right'>
              <button className='btn btn--small btn--green btn--save-password'>Save password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
