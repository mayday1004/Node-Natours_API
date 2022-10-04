import React from 'react';

const TourGuide = ({ name, photo, role }) => {
  return (
    <div className='overview-box__detail'>
      <img src={`../images/users/${photo}`} alt={role} className='overview-box__img' />
      <span className='overview-box__label'>{role.split('-').join(' ').toUpperCase()}</span>
      <span className='overview-box__text'>{name}</span>
    </div>
  );
};

export default TourGuide;
