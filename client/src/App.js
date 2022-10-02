import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Register, Error, ProtectRoute } from './pages';
import { AllTours, Login, Register, Profile, Error, ShareLayout } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShareLayout />}>
          <Route index element={<AllTours />}></Route>
          <Route path='signup' element={<Register />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='me' element={<Profile />}></Route>
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
