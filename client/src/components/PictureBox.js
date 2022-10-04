import React from 'react';

const PictureBox = ({ i, image }) => {
  return (
    <div className='picture-box'>
      <img
        className={`picture-box__img picture-box__img--${i + 1}`}
        src={`../images/tours/${image}`}
        alt={`The Park Camper Tour ${i + 1}`}
      />
    </div>
  );
};

export default PictureBox;
