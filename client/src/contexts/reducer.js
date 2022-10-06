import {
  CLEAR_ALERT,
  GET_ALLTOURS_BEGIN,
  GET_ALLTOURS_SUCCESS,
  GET_TOUR_BEGIN,
  GET_TOUR_SUCCESS,
  GET_REVIEWS_BEGIN,
  GET_REVIEWS_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './action';

import { initialState } from './appContext';

const reducer = (state, action) => {
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === GET_ALLTOURS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_ALLTOURS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      tours: action.payload.tour,
      submit: false,
    };
  }

  if (action.type === GET_TOUR_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_TOUR_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      tour: action.payload.tour,
    };
  }

  if (action.type === GET_REVIEWS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_REVIEWS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      reviews: action.payload.review,
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
      user: action.payload.user,
      token: action.payload.token,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.message,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      token: null,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.message,
    };
  }

  if (action.type === FORGOT_PASSWORD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === FORGOT_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
      submit: true,
    };
  }
  if (action.type === FORGOT_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.message,
      submit: false,
    };
  }

  if (action.type === RESET_PASSWORD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === RESET_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      token: action.payload.token,
      user: action.payload.user,
      alertType: 'success',
      alertText: action.payload.alertText,
      submit: true,
    };
  }
  if (action.type === RESET_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.message,
      submit: false,
    };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
