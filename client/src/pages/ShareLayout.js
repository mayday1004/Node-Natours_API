import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer, Alert } from '../components';
import { useAppContext } from '../contexts/appContext';

const ShareLayout = () => {
  const { showAlert } = useAppContext();
  return (
    <>
      {showAlert && <Alert />}
      <Navbar />
      <main className='main'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ShareLayout;
