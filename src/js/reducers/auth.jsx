
import {
  RECIEVE_USER,
} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case RECIEVE_USER:
      return action.user;
    default:
      return state;
  }
};
