import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Loading, ReviewCard } from '.';
import { useAppContext } from '../contexts/appContext';

const ProfileReviews = () => {
  const { isLoading, userReviews, getCurrentUserReviews } = useAppContext();

  useEffect(() => {
    getCurrentUserReviews();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='booking-container'>
      {userReviews.map(review => {
        return (
          <div className='reviews__card' style={{ width: '40rem' }}>
            <div className='reviews__avatar'>
              <h6 className='reviews__user'>{review.tour.name}</h6>
            </div>
            <p className='reviews__text'>{review.review}</p>
            <div className='reviews__rating'>
              {Array.from({ length: review.rating }).map((_, i) => {
                return <AiFillStar key={i} className='reviews__star reviews__star--active' />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileReviews;
