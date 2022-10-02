import React from 'react';
import FormRow from '../components/FormRow';

const Login = () => {
  return (
    <div className='login-form'>
      <h2 className='heading-secondary ma-bt-lg'>Log into your account</h2>
      <form className='form form--login'>
        <FormRow htmlFor='email' type='email' placeholder='you@example.io' text='Email address' />
        <FormRow
          className='ma-bt-md'
          htmlFor='password'
          type='password'
          placeholder='••••••••'
          text='Password'
          minlength='8'
        />
        <div className='form__group'>
          <button className='btn btn--green'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
