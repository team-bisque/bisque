
import {
  AUTHENTICATED,
} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return action.user;
    default:
      return state;
  }  
};
