import * as actionTypes from '../actions/types';

const intialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case actionTypes.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case actionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case actionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
