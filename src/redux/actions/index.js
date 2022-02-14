import fetchToken from '../../services/fetchToken';

import {
  USER_LOGIN,
  GET_TOKEN,
} from './actionTypes';

export const getUser = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

export const tokenAPI = () => async (dispatch) => {
  const data = await fetchToken();
  dispatch(getToken(data.token));
  return data.token;
};
