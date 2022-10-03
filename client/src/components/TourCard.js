import React from 'react';
import { Link } from 'react-router-dom';
import { GoLocation } from 'react-icons/go';
import { MdDateRange } from 'react-icons/md';
import { RiFlagLine, RiUser3Line } from 'react-icons/ri';

const TourCard = () => {
  return (
    <div className='card'>
      <div className='card__header'>
        <div className='card__picture'>
          <div className='card__picture-overlay'>&nbsp;</div>
          <img className='card__picture-img' src='images/tours/tour-2-cover.jpg' alt='The Sea Explorer' />
        </div>
        <h3 className='heading-tertirary'>
          <span>The Sea Explorer</span>
        </h3>
      </div>
      <div className='card__details'>
        <h4 className='card__sub-heading'>medium 7-day tour</h4>
        <p className='card__text'>Exploring the jaw-dropping US east coast by foot and by boat</p>
        <div className='card__data'>
          <GoLocation className='card__icon' />
          <span>Miami, USA</span>
        </div>
        <div className='card__data'>
          <MdDateRange className='card__icon' />
          <span>June 2021</span>
        </div>
        <div className='card__data'>
          <RiFlagLine className='card__icon' />
          <span>4 stops</span>
        </div>
        <div className='card__data'>
          <RiUser3Line className='card__icon' />
          <span>15 people</span>
        </div>
      </div>
      <div className='card__footer'>
        <p>
          <span className='card__footer-value'>$497</span>{' '}
          <span className='card__footer-text'>per person</span>
        </p>
        <p className='card__ratings'>
          <span className='card__footer-value'>4.3</span>{' '}
          <span className='card__footer-text'>rating (7)</span>
        </p>
        <Link className='btn btn--green btn--small' to='/tour/the-sea-explorer'>
          Details
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
