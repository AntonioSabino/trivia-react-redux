const USER_LOGIN = 'USER_LOGIN';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case USER_LOGIN:
    return {
      ...state,
      player: payload,
    };

  default:
    return state;
  }
};

export default user;
