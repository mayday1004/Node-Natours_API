import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AllTours, TourInfo, Login, Register, Profile, Error, ShareLayout, ProtectRoute } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShareLayout />}>
          <Route index element={<AllTours />} />
          <Route path='signup' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='/tour/:id' element={<TourInfo />} />
          <Route
            path='me'
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
