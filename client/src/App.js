import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AllTours, TourInfo, Login, Register, Profile, Error, ShareLayout } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShareLayout />}>
          <Route index element={<AllTours />} />
          <Route path='/tour/:slugify' element={<TourInfo />} />
          <Route path='signup' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='me' element={<Profile />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
