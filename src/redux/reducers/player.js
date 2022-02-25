const USER_LOGIN = 'USER_LOGIN';
const UPDATE_SCORE = 'UPDATE_SCORE';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case USER_LOGIN:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.gravatarEmail,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      assertions: payload.assertions,
      score: payload.score,
    };
  default:
    return state;
  }
};

export default player;
