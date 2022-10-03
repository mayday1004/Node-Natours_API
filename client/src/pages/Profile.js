import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSetting, AiOutlineStar, AiOutlineCreditCard } from 'react-icons/ai';
import { RiBriefcase3Line } from 'react-icons/ri';
import { FormRow } from '../components';
import { useAppContext } from '../contexts/appContext';

const Profile = () => {
  const { user, updateUser } = useAppContext();

  const initialState = {
    name: user.name,
    email: user.email,
    passwordCurrent: '',
    newPassword: '',
    newPasswordConfirm: '',
  };
  const [values, setValues] = useState(initialState);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitACSetting = e => {
    e.preventDefault();
    const { name, email } = values;
    const currentUser = { name, email };
    updateUser({ currentUser, endPoint: 'updateMe', alertText: 'Account Setting Success!' });
  };

  const onSubmitPasswordChange = e => {
    e.preventDefault();
    const { passwordCurrent, newPassword, newPasswordConfirm } = values;
    const currentUser = { passwordCurrent, newPassword, newPasswordConfirm };
    updateUser({ currentUser, endPoint: 'updateMyPassword', alertText: 'Password Change Success!' });
    setValues({ ...values, passwordCurrent: '', newPassword: '', newPasswordConfirm: '' });
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
              value={user.name}
              handleChange={handleChange}
            />
            <FormRow
              className='ma-bt-md'
              name='email'
              type='email'
              placeholder='you@example.io'
              text='Email address'
              value={user.email}
              handleChange={handleChange}
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
          <form className='form form-user-password' onSubmit={onSubmitPasswordChange}>
            <FormRow
              name='passwordCurrent'
              type='password'
              placeholder='••••••••'
              text='Current password'
              minlength='8'
              value={values.passwordCurrent}
              handleChange={handleChange}
            />
            <FormRow
              name='newPassword'
              type='password'
              placeholder='••••••••'
              text='New password'
              minlength='8'
              value={values.newPassword}
              handleChange={handleChange}
            />
            <FormRow
              className='ma-bt-lg'
              name='newPasswordConfirm'
              type='password'
              placeholder='••••••••'
              text='Confirm password'
              minlength='8'
              value={values.newPasswordConfirm}
              handleChange={handleChange}
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
