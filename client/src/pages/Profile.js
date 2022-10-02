import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSetting, AiOutlineStar, AiOutlineCreditCard } from 'react-icons/ai';
import { RiBriefcase3Line } from 'react-icons/ri';
import FormRow from '../components/FormRow';

const Profile = () => {
  return (
    <div class='user-view'>
      <nav class='user-view__menu'>
        <ul class='side-nav'>
          <li class='side-nav--active'>
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
      <div class='user-view__content'>
        <div class='user-view__form-container'>
          <h2 class='heading-secondary ma-bt-md'>Your account settings</h2>
          <form class='form form-user-data'>
            <FormRow htmlFor='name' type='text' required='required' text='Your name' />
            <FormRow
              className='ma-bt-md'
              htmlFor='email'
              type='email'
              placeholder='you@example.io'
              text='Email address'
            />
            <div class='form__group form__photo-upload'>
              <img class='form__user-photo' src='/img/users/user-14.jpg' alt='User photo' />
              <input class='form__upload' type='file' accept='image/*' id='photo' name='photo' />
              <label for='photo'>Choose new photo</label>
            </div>
            <div class='form__group right'>
              <button class='btn btn--small btn--green'>Save settings</button>
            </div>
          </form>
        </div>
        <div class='line'>&nbsp;</div>
        <div class='user-view__form-container'>
          <h2 class='heading-secondary ma-bt-md'>Password change</h2>
          <form class='form form-user-password'>
            <FormRow
              htmlFor='password-current'
              type='password'
              placeholder='••••••••'
              text='Current password'
              minlength='8'
            />
            <FormRow
              htmlFor='password'
              type='password'
              placeholder='••••••••'
              text='New password'
              minlength='8'
            />
            <FormRow
              className='ma-bt-lg'
              htmlFor='password-confirm'
              type='password'
              placeholder='••••••••'
              text='Confirm password'
              minlength='8'
            />
            <div class='form__group right'>
              <button class='btn btn--small btn--green btn--save-password'>Save password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
