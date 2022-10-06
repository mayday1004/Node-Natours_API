import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FormRow } from '../components';
import { useAppContext } from '../contexts/appContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState({ email: '' });
  const { isLoading, submit, forgotPassword } = useAppContext();
  const navigate = useNavigate();

  const handleChange = e => {
    setEmail({ ...email, email: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    forgotPassword(email);
  };

  useEffect(() => {
    if (submit) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [submit, navigate]);

  return (
    <div className='login-form'>
      <h2 className='heading-secondary ma-bt-lg'>Forgot Password</h2>
      <form className='form form--login' onSubmit={onSubmit}>
        <FormRow
          name='email'
          type='email'
          placeholder='you@example.io'
          text='Enter your email address'
          value={email.email}
          handleChange={handleChange}
        />
        <div className='form__group'>
          <button className='btn btn--green'>{isLoading ? 'loading...' : 'Next'}</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
