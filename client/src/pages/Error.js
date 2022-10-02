import React from 'react';

const Error = () => {
  return (
    <div className='error'>
      <div className='error__title'>
        <h2 className='heading-secondary heading-secondary--error'>Uh oh! Something went wrong! </h2>
        <h2 className='error__emoji'>😢 🤯</h2>
      </div>
      <div className='error__msg'>Please try again later.</div>
    </div>
  );
};

export default Error;
