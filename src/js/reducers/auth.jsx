
import {
  AUTHENTICATE,
} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return action.user;
    default:
      return state;
  }
};
