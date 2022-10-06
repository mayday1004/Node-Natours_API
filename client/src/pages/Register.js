import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormRow } from '../components';
import { useAppContext } from '../contexts/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user, setupUser } = useAppContext();
  const navigate = useNavigate();

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { name, email, password, passwordConfirm } = values;
    const currentUser = { name, email, password, passwordConfirm };
    setupUser({ currentUser, endPoint: 'signup', alertText: 'Register Success! Redirectiong...' });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/welcome');
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <div className='login-form'>
      <h2 className='heading-secondary ma-bt-lg'>Create your account!</h2>
      <form className='form form--signup' onSubmit={onSubmit}>
        <FormRow
          name='name'
          type='text'
          required='required'
          text='Your name'
          value={values.name}
          handleChange={handleChange}
        />
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
          minlength='8'
          value={values.password}
          handleChange={handleChange}
        />
        <FormRow
          className='ma-bt-md'
          name='passwordConfirm'
          type='password'
          placeholder='••••••••'
          text='Confirm password'
          minlength='8'
          value={values.passwordConfirm}
          handleChange={handleChange}
        />
        <div className='form__group'>
          <button className='btn btn--green'>Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
