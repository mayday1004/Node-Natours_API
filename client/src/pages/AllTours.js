import { useEffect } from 'react';
import { TourCard, Loading } from '../components';
import { useAppContext } from '../contexts/appContext';

const AllTours = () => {
  const { isLoading, getAllTours, tours } = useAppContext();

  useEffect(() => {
    getAllTours();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='card-container'>
      {tours.map(tour => {
        return <TourCard key={tour._id} {...tour} />;
      })}
    </div>
  );
};

export default AllTours;
