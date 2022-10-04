import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import reducer from './reducer';
import {
  CLEAR_ALERT,
  GET_ALLTOURS_BEGIN,
  GET_ALLTOURS_SUCCESS,
  GET_REVIEWS_BEGIN,
  GET_REVIEWS_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
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
  reviews: [],
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
    dispatch({ type: GET_ALLTOURS_BEGIN });
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
    clearAlert();
  };

  const getReviews = async endpoint => {
    dispatch({ type: GET_REVIEWS_BEGIN });
    try {
      const { data } = await authFetch(`/tours/${endpoint}/reviews`);
      const { review } = data;
      console.log(review);
      dispatch({ type: GET_REVIEWS_SUCCESS, payload: { review } });
    } catch (error) {
      // logoutUser();
    }
    clearAlert();
  };

  const addUserToCookie = ({ user, token }) => {
    Cookies.set('token', token, { expires: 1 });
    Cookies.set('user', JSON.stringify(user), {
      expires: 1,
    });
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
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
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch(`/users/${endPoint}`, currentUser);
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

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearAlert,
        getAllTours,
        getReviews,
        setupUser,
        logoutUser,
        updateUser,
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
