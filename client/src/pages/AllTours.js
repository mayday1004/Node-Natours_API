import { TourCard } from '../components';
import { useAppContext } from '../contexts/appContext';

const AllTours = () => {
  const { tours } = useAppContext();
  return (
    <div className='card-container'>
      {tours.map(tour => {
        return <TourCard key={tour._id} {...tour} />;
      })}
    </div>
  );
};

export default AllTours;
