import axios from 'axios';

import setAuthToken from '../../utilis/setAuthToken';
import { setAlert } from './alert';
import * as actionTypes from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: actionTypes.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: actionTypes.REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  console.log(body);
  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err);
    if (errors) {
      errors.forEach((error) => setAlert(error.msg, 'danger'));
    }
    dispatch({
      type: actionTypes.LOGIN_FAIL,
    });
  }
};

// Logout / clear profile
export const logout = () => (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT,
  });
  dispatch({
    type: actionTypes.CLEAR_PROFILE,
  });
};
