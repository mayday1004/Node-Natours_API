import { Link } from 'react-router-dom';
import { GoLocation } from 'react-icons/go';
import { MdDateRange } from 'react-icons/md';
import { RiFlagLine, RiUser3Line } from 'react-icons/ri';
import moment from 'moment';

const TourCard = ({ ...tour }) => {
  let date = moment(tour.startDates[0]);
  date = date.format('MMM YYYY');

  return (
    <div className='card'>
      <div className='card__header'>
        <div className='card__picture'>
          <div className='card__picture-overlay'>&nbsp;</div>
          <img className='card__picture-img' src={`images/tours/${tour.imageCover}`} alt={tour.name} />
        </div>
        <h3 className='heading-tertirary'>
          <span>{tour.name}</span>
        </h3>
      </div>
      <div className='card__details'>
        <h4 className='card__sub-heading'>{`${tour.difficulty} ${tour.duration}-day tour`}</h4>
        <p className='card__text'>{tour.summary}</p>
        <div className='card__data'>
          <GoLocation className='card__icon' />
          <span>{tour.startLocation.description}</span>
        </div>
        <div className='card__data'>
          <MdDateRange className='card__icon' />
          <span>{date}</span>
        </div>
        <div className='card__data'>
          <RiFlagLine className='card__icon' />
          <span>{`${tour.locations.length} stops`}</span>
        </div>
        <div className='card__data'>
          <RiUser3Line className='card__icon' />
          <span>{`${tour.maxGroupSize} people`}</span>
        </div>
      </div>
      <div className='card__footer'>
        <p>
          <span className='card__footer-value'>{`$${tour.price} `}</span>
          <span className='card__footer-text'>per person</span>
        </p>
        <p className='card__ratings'>
          <span className='card__footer-value'>{tour.ratingsAverage}</span>
          <span className='card__footer-text'>{` rating (${tour.ratingsQuantity})`}</span>
        </p>
        <Link className='btn btn--green btn--small' to={`/tour/${tour._id}`}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
