import { useEffect, useState } from 'react';
import moment from 'moment';
import { AiOutlineClockCircle, AiOutlineCalendar, AiOutlineStar } from 'react-icons/ai';
import { CgPin } from 'react-icons/cg';
import { BiTrendingUp, BiUser } from 'react-icons/bi';
import { Loading, TourGuide, ReviewCard, PictureBox, MapLeaflet } from '../components';
import { useAppContext } from '../contexts/appContext';

const TourInfo = () => {
  const { getTour, tour, getReviews, reviews } = useAppContext();

  useEffect(() => {
    getTour(window.location.pathname.split('/')[2]);
    getReviews(window.location.pathname.split('/')[2]);
  }, []);

  if (tour && reviews) {
    return (
      <>
        <section className='section-header'>
          <div className='header__hero'>
            <div className='header__hero-overlay'>&nbsp;</div>
            <img src={`../images/tours/${tour.imageCover}`} alt='' className='header__hero-img' />
          </div>
          <div className='heading-box'>
            <h1 className='heading-primary'>
              <span>{tour.name}</span>
            </h1>
            <div className='heading-box__group'>
              <div className='heading-box__detail'>
                <AiOutlineClockCircle className='heading-box__icon' />
                <span className='heading-box__text'>{tour.duration} days</span>
              </div>
              <div className='heading-box__detail'>
                <CgPin className='heading-box__icon' />

                <span className='heading-box__text'>{tour.startLocation?.description}</span>
              </div>
            </div>
          </div>
        </section>
        <section className='section-description'>
          <div className='overview-box'>
            <div>
              <div className='overview-box__group'>
                <h2 className='heading-secondary ma-bt-lg'>Quick facts</h2>
                <div className='overview-box__detail'>
                  <AiOutlineCalendar className='overview-box__icon' />
                  <span className='overview-box__label'>Next date</span>
                  <span className='overview-box__text'>{moment(tour.startDates[0]).format('MMM YYYY')}</span>
                </div>
                <div className='overview-box__detail'>
                  <BiTrendingUp className='overview-box__icon' />
                  <span className='overview-box__label'>Difficulty</span>
                  <span className='overview-box__text'>{tour.difficulty}</span>
                </div>
                <div className='overview-box__detail'>
                  <BiUser className='overview-box__icon' />
                  <span className='overview-box__label'>Participants</span>
                  <span className='overview-box__text'>{tour.maxGroupSize} people</span>
                </div>
                <div className='overview-box__detail'>
                  <AiOutlineStar className='overview-box__icon' />
                  <span className='overview-box__label'>Rating</span>
                  <span className='overview-box__text'>{tour.ratingsAverage} / 5</span>
                </div>
              </div>

              <div className='overview-box__group'>
                <h2 className='heading-secondary ma-bt-lg'>Your tour guides</h2>
                {tour.guides.map((guide, i) => {
                  return <TourGuide key={i} {...guide} />;
                })}
              </div>
            </div>
          </div>

          <div className='description-box'>
            <h2 className='heading-secondary ma-bt-lg'>About the park camper tour</h2>
            <p className='description__text'>{tour.description.split('\n')[0]}</p>
            <p className='description__text'>{tour.description.split('\n')[1]}</p>
          </div>
        </section>
        <section className='section-pictures'>
          {tour.images.map((image, i) => {
            return <PictureBox key={i} image={image} i={i} />;
          })}
        </section>
        <section className='section-map'>
          <MapLeaflet {...tour.locations} />
        </section>
        <section className='section-reviews'>
          <div className='reviews'>
            {reviews.map(review => {
              return <ReviewCard key={review._id} {...review} />;
            })}
          </div>
        </section>
        <section className='section-cta'>
          <div className='cta'>
            <div className='cta__img cta__img--logo'>
              <img src='../images/logo-white.png' alt='Natours logo' className='' />
            </div>
            <img src={`../images/tours/${tour.images[1]}`} alt='' className='cta__img cta__img--1' />
            <img src={`../images/tours/${tour.images[2]}`} alt='' className='cta__img cta__img--2' />

            <div className='cta__content'>
              <h2 className='heading-secondary'>What are you waiting for?</h2>
              <p className='cta__text'>
                {tour.duration} days. 1 adventure. Infinite memories. Make it yours today!
              </p>
              <button className='btn btn--green span-all-rows'>Book tour now!</button>
            </div>
          </div>
        </section>
      </>
    );
  }
  return <Loading />;
};

export default TourInfo;
