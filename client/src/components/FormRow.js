import React from 'react';

const FormRow = ({ htmlFor, type, placeholder, text, minlength }) => {
  return (
    <div className='form__group'>
      <label className='form__label' htmlFor={htmlFor}>
        {text}
      </label>
      <input
        className='form__input'
        id={htmlFor}
        type={type}
        placeholder={placeholder}
        required
        minlength={minlength}
      />
    </div>
  );
};

export default FormRow;
