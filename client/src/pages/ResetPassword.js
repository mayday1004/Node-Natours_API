import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FormRow } from '../components';
import { useAppContext } from '../contexts/appContext';

const initialState = {
  password: '',
  passwordConfirm: '',
};

const ResetPassword = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, user, resetPassword } = useAppContext();
  const navigate = useNavigate();
  const resetToken = window.location.pathname.split('/')[2];

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { password, passwordConfirm } = values;
    const newPassword = { password, passwordConfirm };
    resetPassword({ resetToken, newPassword });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <div className='login-form'>
      <h2 className='heading-secondary ma-bt-lg'>Reset Password</h2>
      <form className='form form--login' onSubmit={onSubmit}>
        <FormRow
          className='ma-bt-md'
          name='password'
          type='password'
          placeholder='••••••••'
          text='Enter your new password'
          minlength='8'
          value={values.password}
          handleChange={handleChange}
        />
        <FormRow
          className='ma-bt-md'
          name='passwordConfirm'
          type='password'
          placeholder='••••••••'
          text='Confirm your new password'
          minlength='8'
          value={values.passwordConfirm}
          handleChange={handleChange}
        />
        <div className='form__group'>
          <button className='btn btn--green'>{isLoading ? 'loading...' : 'Next'}</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
