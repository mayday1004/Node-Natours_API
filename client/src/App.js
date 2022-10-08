import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfileSetting, ProfileBooking, ProfileReviews } from './components';
import {
  AllTours,
  TourInfo,
  Login,
  Register,
  Profile,
  Error,
  ShareLayout,
  ProtectRoute,
  Welcome,
  ForgotPassword,
  ResetPassword,
  Booking,
} from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShareLayout />}>
          <Route index element={<AllTours />} />
          <Route path='signup' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='forgotPassword' element={<ForgotPassword />} />
          <Route path='resetPassword/:token' element={<ResetPassword />} />
          <Route path='tour/:id' element={<TourInfo />} />
          <Route
            path='welcome'
            element={
              <ProtectRoute>
                <Welcome />
              </ProtectRoute>
            }
          />
          <Route
            path='booking'
            element={
              <ProtectRoute>
                <Booking />
              </ProtectRoute>
            }
          />
          <Route
            path='me'
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          >
            <Route index element={<ProfileSetting />} />
            <Route path='my-tours' element={<ProfileBooking />} />
            <Route path='reviews' element={<ProfileReviews />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
