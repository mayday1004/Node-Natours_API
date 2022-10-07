import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './';
import { useAppContext } from '../contexts/appContext';

const ProfileBooking = () => {
  const { isLoading, bookings, getCurrentUserBooking } = useAppContext();

  useEffect(() => {
    getCurrentUserBooking();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='booking-container'>
      {bookings.map(booking => {
        return (
          <div className='booking__card' style={{ border: '1px solid black', padding: '2rem 2rem' }}>
            <h2>Tracking number : {booking._id}</h2>
            <h2>Created at : {booking.createdAt.split('T')[0]}</h2>
            <h2>
              Purchase Item : <Link to={`../../tour/${booking.tour._id}`}>{booking.tour.name}</Link>
            </h2>
            <h2>
              Price :{' '}
              {booking.price.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
              })}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileBooking;
