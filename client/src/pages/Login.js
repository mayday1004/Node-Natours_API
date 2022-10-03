import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormRow } from '../components';
import { useAppContext } from '../contexts/appContext';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  const { user, setupUser } = useAppContext();
  const navigate = useNavigate();

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { email, password } = values;
    const currentUser = { email, password };
    setupUser({ currentUser, endPoint: 'login', alertText: 'Login Success! Redirectiong...' });
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
      <h2 className='heading-secondary ma-bt-lg'>Log into your account</h2>
      <form className='form form--login' onSubmit={onSubmit}>
        <FormRow
          name='email'
          type='email'
          placeholder='you@example.io'
          text='Email address'
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          className='ma-bt-md'
          name='password'
          type='password'
          placeholder='••••••••'
          text='Password'
          minLength='8'
          value={values.password}
          handleChange={handleChange}
        />
        <div className='form__group'>
          <button className='btn btn--green'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
