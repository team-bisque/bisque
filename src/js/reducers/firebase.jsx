
import {
  RECEIVE_FIREBASE,
} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case RECEIVE_FIREBASE:
      return action.firebase;
    default:
      return state;
  }  
};
