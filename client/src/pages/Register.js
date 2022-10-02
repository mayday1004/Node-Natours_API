import React from 'react';
import FormRow from '../components/FormRow';

const Register = () => {
  return (
    <div className='login-form'>
      <h2 className='heading-secondary ma-bt-lg'>Create your account!</h2>
      <form className='form form--signup'>
        <FormRow htmlFor='name' type='text' required='required' text='Your name' />
        <FormRow htmlFor='email' type='email' placeholder='you@example.io' text='Email address' />
        <FormRow
          className='ma-bt-md'
          htmlFor='password'
          type='password'
          placeholder='••••••••'
          text='Password'
          minlength='8'
        />
        <FormRow
          className='ma-bt-md'
          htmlFor='password'
          type='password'
          placeholder='••••••••'
          text='Confirm password'
          minlength='8'
        />
        <div className='form__group'>
          <button className='btn btn--green'>Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
