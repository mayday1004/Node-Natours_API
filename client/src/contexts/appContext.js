import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import reducer from './reducer';
import {
  CLEAR_ALERT,
  FETCH_BEGIN,
  GET_ALLTOURS_SUCCESS,
  GET_TOUR_SUCCESS,
  GET_REVIEWS_SUCCESS,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  GET_USER_BOOKING_SUCCESS,
  GET_USER_BOOKING_ERROR,
  GET_USER_REVIEWS_SUCCESS,
  GET_USER_REVIEWS_ERROR,
  PAYMENT_SUCCESS,
  PAYMENT_ERROR,
} from './action';

const token = Cookies.get('token');
const user = Cookies.get('user');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token ? token : null,
  tours: [],
  tour: '',
  reviews: [],
  userReviews: [],
  submit: false,
  bookings: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });

  authFetch.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error.response);
    }
  );

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  const getAllTours = async () => {
    dispatch({ type: FETCH_BEGIN });
    try {
      const { data } = await authFetch('/tours');
      const { tour } = data;

      dispatch({
        type: GET_ALLTOURS_SUCCESS,
        payload: { tour },
      });
    } catch (error) {
      // logoutUser();
    }
  };

  const getTour = async endpoint => {
    dispatch({ type: FETCH_BEGIN });
    try {
      const { data } = await authFetch(`/tours/${endpoint}`);
      const { tour } = data;

      dispatch({
        type: GET_TOUR_SUCCESS,
        payload: { tour },
      });
    } catch (error) {
      // logoutUser();
    }
  };

  const getReviews = async endpoint => {
    dispatch({ type: FETCH_BEGIN });
    try {
      const { data } = await authFetch(`/tours/${endpoint}/reviews`);
      const { review } = data;
      dispatch({ type: GET_REVIEWS_SUCCESS, payload: { review } });
    } catch (error) {
      // logoutUser();
    }
  };

  const addUserToCookie = ({ user, token }) => {
    Cookies.set('token', token, { expires: 1 });
    Cookies.set('user', JSON.stringify(user), {
      expires: 1,
    });
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: FETCH_BEGIN });
    try {
      const { data } = await authFetch.post(`/users/${endPoint}`, currentUser);
      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToCookie({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { message: error.data.message },
      });
      logoutUser();
    }
    clearAlert();
  };

  const logoutUser = async () => {
    const { data } = await authFetch('/users/logout');
    const { user, token } = data;
    addUserToCookie({ user, token });
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: FETCH_BEGIN });
    try {
      const { data } = await authFetch.patch(`/users/${endPoint}`, currentUser, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      const { user, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToCookie({ user, token });
    } catch (error) {
      console.log(error);
      if (error.status !== 401) {
        //如果是401錯誤會被axios攔截器處理
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { message: error.data.message },
        });
      }
    }
    clearAlert();
  };

  const forgotPassword = async email => {
    dispatch({ type: FETCH_BEGIN });
    try {
      await authFetch.post('/users/forgotPassword', email);
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: { alertText: 'Please check your emaill for reset link.' },
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: { message: error.data.message },
      });
    }
    clearAlert();
  };

  const resetPassword = async ({ resetToken, newPassword }) => {
    dispatch({ type: FETCH_BEGIN });
    try {
      const { data } = await authFetch.patch(`/users/resetPassword/${resetToken}`, newPassword);
      const { user, token } = data;
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: { user, token, alertText: 'Password changed success!' },
      });
      addUserToCookie({ user, token });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: { message: error.data.message },
      });
    }
    clearAlert();
  };

  const getCurrentUserBooking = async () => {
    dispatch({ type: FETCH_BEGIN });
    try {
      const { data } = await authFetch.get('/bookings/userBooking');
      const { booking } = data;
      dispatch({ type: GET_USER_BOOKING_SUCCESS, payload: { booking } });
    } catch (error) {
      dispatch({
        type: GET_USER_BOOKING_ERROR,
        payload: { message: error.data.message },
      });
    }
    clearAlert();
  };

  const getCurrentUserReviews = async () => {
    dispatch({ type: FETCH_BEGIN });
    try {
      const { data } = await authFetch.get('/reviews/me');
      const { review } = data;
      dispatch({ type: GET_USER_REVIEWS_SUCCESS, payload: { review } });
    } catch (error) {
      dispatch({
        type: GET_USER_REVIEWS_ERROR,
        payload: { message: error.data.message },
      });
    }
    clearAlert();
  };

  const payByPrime = async paymentData => {
    dispatch({ type: FETCH_BEGIN });
    try {
      await authFetch.post('/bookings/pay-by-prime', paymentData);
      dispatch({ type: PAYMENT_SUCCESS, payload: { alertText: 'Payment success!' } });
    } catch (error) {
      dispatch({ type: PAYMENT_ERROR, payload: { message: error.data.message } });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearAlert,
        getAllTours,
        getTour,
        getReviews,
        setupUser,
        logoutUser,
        updateUser,
        forgotPassword,
        resetPassword,
        getCurrentUserBooking,
        getCurrentUserReviews,
        payByPrime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
