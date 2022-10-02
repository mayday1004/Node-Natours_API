import React, { useReducer, useContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import reducer from './reducer';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
} from './action';

const token = Cookies.get('token');
const user = Cookies.get('user');

const initialState = {
  //USER
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token ? token : null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: '/api/v1/users',
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });
  //   // axios提供的中間件，想要送出請求前做什麼就用interceptors.request
  //   authFetch.interceptors.response.use(
  //     response => {
  //       return response;
  //     },
  //     error => {
  //       if (error.response.status === 401) {
  //         logoutUser();
  //       }
  //       return Promise.reject(error.response);
  //     }
  //   );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  //USER
  const addUserToCookie = ({ user, token }) => {
    Cookies.set('token', token, { expires: 1 });
    Cookies.set('user', JSON.stringify(user), {
      expires: 1,
    });
  };
  const removeUserFromCookie = () => {
    Cookies.remove('token', { path: '' });
    Cookies.remove('user', { path: '' });
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await authFetch.post(`/${endPoint}`, currentUser);
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
    dispatch({ type: LOGOUT_USER });
    await authFetch.get('/logout');
    removeUserFromCookie();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
const useAppConsumer = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppConsumer };
