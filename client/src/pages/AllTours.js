import { useEffect } from 'react';
import { TourCard } from '../components';
import { useAppContext } from '../contexts/appContext';

const AllTours = () => {
  const { getAllTours, tours } = useAppContext();

  useEffect(() => {
    getAllTours();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='card-container'>
      {tours.map(tour => {
        return <TourCard key={tour._id} {...tour} />;
      })}
    </div>
  );
};

export default AllTours;
