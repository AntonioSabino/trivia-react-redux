import USER_LOGIN from '../actions/actionTypes';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const user = (state = INITIAL_STATE, { type }) => {
  switch (type) {
  case USER_LOGIN:
    return state;
  default:
    return state;
  }
};

export default user;
