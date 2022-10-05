import { AiFillStar } from 'react-icons/ai';

const ReviewCard = ({ ...review }) => {
  return (
    <div className='reviews__card'>
      <div className='reviews__avatar'>
        <img
          src={`../images/users/${review.user.photo}`}
          alt={review.user.name}
          className='reviews__avatar-img'
        />
        <h6 className='reviews__user'>{review.user.name}</h6>
      </div>
      <p className='reviews__text'>{review.review}</p>
      <div className='reviews__rating'>
        {Array.from({ length: review.rating }).map((_, i) => {
          return <AiFillStar key={i} className='reviews__star reviews__star--active' />;
        })}
      </div>
    </div>
  );
};

export default ReviewCard;
