import {
  USER_LOGIN,
  GET_TOKEN,
} from './actionTypes';

export const getUser = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});
