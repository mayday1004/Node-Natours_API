import React from 'react';
import { Link } from 'react-router-dom';
import TourCard from '../components/TourCard';
import logoGreen from '../assets/images/logo-green.png';

const AllTours = () => {
  return (
    <main className='main'>
      <div className='card-container'>
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
      </div>
    </main>
  );
};

export default AllTours;
