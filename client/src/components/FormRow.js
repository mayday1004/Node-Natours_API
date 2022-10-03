import React from 'react';

const FormRow = ({ name, type, placeholder, text, minLength, handleChange, value }) => {
  return (
    <div className='form__group'>
      <label className='form__label' htmlFor={name}>
        {text}
      </label>
      <input
        className='form__input'
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default FormRow;
