import { combineReducers } from 'redux';
import user from './player';
import token from './token';

const rootReducer = combineReducers({
  user,
  token,
});

export default rootReducer;
