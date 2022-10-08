import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/appContext';

const Booking = () => {
  const { isLoading, tour, user, payByPrime } = useAppContext();
  const navigate = useNavigate();

  const tappay = document.createElement('script');
  tappay.setAttribute('src', 'https://js.tappaysdk.com/tpdirect/v5.13.1');
  let TPDirect;

  document.body.appendChild(tappay); //add everithing to the DOM

  useEffect(() => {
    tappay.addEventListener('load', () => {
      TPDirect = window.TPDirect;
      TPDirect.setupSDK(11327, 'app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC', 'sandbox');
      TPDirect.card.setup('#cardview-container');
    });
  }, []);

  function onClick(e) {
    e.preventDefault();
    // 讓 button click 之後觸發 getPrime 方法
    TPDirect.card.getPrime(function (result) {
      if (result.status !== 0) {
        console.err('getPrime 錯誤');
        return;
      }
      var prime = result.card.prime;
      alert('getPrime 成功: ' + prime);
      const payment = {
        prime,
        name: tour.name,
        tour: tour._id,
        user: user._id,
        price: tour.price,
      };
      payByPrime(payment);
    });
    if (!isLoading) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }

  if (tour) {
    return (
      <div className='login-form'>
        <h2 className='heading-secondary ma-bt-lg'>Credit Card</h2>
        <div id='cardview-container' className=' ma-bt-lg'></div>

        <form className='form form--login'>
          <div className='form__group form__group--login'>
            <button id='submit-button' className='btn btn--green' onClick={onClick}>
              Get Prime
            </button>
          </div>
        </form>
      </div>
    );
  }
  return <Navigate to='/' />;
};

export default Booking;
