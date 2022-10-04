import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppContext } from '../contexts/appContext';

const ProtectRoute = ({ children }) => {
  const { user, token, logoutUser } = useAppContext();
  const cookie = Cookies.get('token');
  if ((!cookie && token) || cookie !== token) {
    logoutUser();
  }

  if (!user) {
    return <Navigate to='/' />;
  } else {
    return children;
  }
};

export default ProtectRoute;
