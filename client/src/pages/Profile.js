import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSetting, AiOutlineStar, AiOutlineCreditCard } from 'react-icons/ai';
import { RiBriefcase3Line } from 'react-icons/ri';
import { FormRow } from '../components';
import { useAppContext } from '../contexts/appContext';

const Profile = () => {
  const { isLoading, user, updateUser } = useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const onSubmitACSetting = e => {
    e.preventDefault();
    const currentUser = { name, email };

    updateUser({ currentUser, endPoint: 'updateMe', alertText: 'Account setting Success!' });
  };

  const onSubmitPasswordChange = e => {
    e.preventDefault();
    const currentUser = { passwordCurrent, newPassword, newPasswordConfirm };
    updateUser({ currentUser, endPoint: 'updateMyPassword', alertText: 'Password change Success!' });
    setPasswordCurrent('');
    setNewPassword('');
    setNewPasswordConfirm('');
  };

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
          <form className='form form-user-data' onSubmit={onSubmitACSetting}>
            <FormRow
              name='name'
              type='text'
              required='required'
              text='Your name'
              value={name}
              handleChange={e => setName(e.target.value)}
            />
            <FormRow
              className='ma-bt-md'
              name='email'
              type='email'
              placeholder='you@example.io'
              text='Email address'
              value={email}
              handleChange={e => setEmail(e.target.value)}
            />
            <div className='form__group form__photo-upload'>
              <img className='form__user-photo' src={`images/users/${user?.photo}`} alt='User' />
              <input className='form__upload' type='file' accept='image/*' id='photo' name='photo' />
              <label htmlFor='photo'>Choose new photo</label>
            </div>
            <div className='form__group right'>
              <button className='btn btn--small btn--green' disabled={isLoading}>
                {isLoading ? 'Please Wait...' : 'Save settings'}
              </button>
            </div>
          </form>
        </div>
        <div className='line'>&nbsp;</div>
        <div className='user-view__form-container'>
          <h2 className='heading-secondary ma-bt-md'>Password change</h2>
          <form className='form form-user-password' onSubmit={onSubmitPasswordChange}>
            <FormRow
              name='passwordCurrent'
              type='password'
              placeholder='••••••••'
              text='Current password'
              minlength='8'
              value={passwordCurrent}
              handleChange={e => setPasswordCurrent(e.target.value)}
            />
            <FormRow
              name='newPassword'
              type='password'
              placeholder='••••••••'
              text='New password'
              minlength='8'
              value={newPassword}
              handleChange={e => setNewPassword(e.target.value)}
            />
            <FormRow
              className='ma-bt-lg'
              name='newPasswordConfirm'
              type='password'
              placeholder='••••••••'
              text='Confirm password'
              minlength='8'
              value={newPasswordConfirm}
              handleChange={e => setNewPasswordConfirm(e.target.value)}
            />
            <div className='form__group right'>
              <button className='btn btn--small btn--green btn--save-password' disabled={isLoading}>
                {isLoading ? 'Please Wait...' : 'Save password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
