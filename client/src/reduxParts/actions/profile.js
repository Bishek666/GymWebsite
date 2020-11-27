import axios from 'axios';
import * as actionTypes from './types';
import { setAlert } from './alert';

// Get current profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/empProfile/me');

    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get All Trainer's profile
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/empProfile');

    dispatch({
      type: actionTypes.GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Profile by Id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/empProfile/user/${userId}`);

    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or Update profile
export const createEmpProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/empProfile', formData, config);

    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    console.log(edit);
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Account
export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure about deleting your account?It cannot be undone'
    )
  ) {
    try {
      const res = await axios.delete('/api/empProfile');

      dispatch({ type: actionTypes.CLEAR_PROFILE });
      dispatch({ type: actionTypes.ACCOUNT_DELETED });
      dispatch(setAlert(res.data.msg, 'success'));
    } catch (err) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
